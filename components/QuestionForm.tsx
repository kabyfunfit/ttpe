'use client'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { account, ID } from '@/lib/appwrite';
import { submitQuestion } from '@/lib/actions';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  content: z.string().min(10).max(500),
  is_anonymous: z.boolean().default(false),
  wants_podcast: z.boolean().default(false),
});

export default function QuestionForm() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [regData, setRegData] = useState({ name: '', email: '', password: '' });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: "", is_anonymous: false, wants_podcast: false },
  });

  async function handleInitialSubmit(values: z.infer<typeof formSchema>) {
    if (values.wants_podcast) {
      setShowRegisterModal(true);
    } else {
      await finalizeSubmission(values);
    }
  }

  async function handleRegisterAndSubmit() {
    setIsSubmitting(true);
    try {
      // 1. Create User Account
      const user = await account.create(ID.unique(), regData.email, regData.password, regData.name);
      // 2. Start Session
      await account.createEmailPasswordSession(regData.email, regData.password);
      // 3. Finalize Question with the new User ID
      await finalizeSubmission(form.getValues(), user.$id);
      setShowRegisterModal(false);
    } catch (error: any) {
      alert(error.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function finalizeSubmission(values: z.infer<typeof formSchema>, authorId?: string) {
    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('content', values.content);
    if (values.is_anonymous) formData.append('is_anonymous', 'on');
    if (values.wants_podcast) formData.append('wants_podcast', 'on');

    const result = await submitQuestion(formData, authorId);
    if (result?.success) {
      form.reset();
      setRegData({ name: '', email: '', password: '' });
    }
    setIsSubmitting(false);
  }

  return (
    <>
      <Card className="mb-8 bg-gray-800 border-gray-700 text-white">
        <CardHeader><CardTitle>Ask a Question</CardTitle></CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleInitialSubmit)} className="space-y-6">
              <FormField control={form.control} name="content" render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="What is on your mind?" 
                      className="bg-gray-900 border-gray-600 min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField control={form.control} name="wants_podcast" render={({ field }) => (
                  <FormItem className="flex items-start space-x-3">
                    <FormControl>
                      <input 
                        type="checkbox" 
                        checked={field.value} 
                        onChange={field.onChange} 
                        className="h-4 w-4 mt-1" 
                      />
                    </FormControl>
                    <Label className="text-sm text-gray-400">I want to be involved when this is answered</Label>
                  </FormItem>
                )} />

                <FormField control={form.control} name="is_anonymous" render={({ field }) => (
                  <FormItem className="flex items-start space-x-3">
                    <FormControl>
                      <input 
                        type="checkbox" 
                        checked={field.value} 
                        onChange={field.onChange} 
                        className="h-4 w-4 mt-1" 
                      />
                    </FormControl>
                    <Label className="text-sm text-gray-400">Post Anonymously</Label>
                  </FormItem>
                )} />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Processing..." : "Submit Question"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={showRegisterModal} onOpenChange={setShowRegisterModal}>
        <DialogContent className="bg-gray-800 text-white border-gray-700 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register to Stay Involved</DialogTitle>
            <DialogDescription className="text-gray-400">
              To be notified when we answer your question, please create a quick account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="reg-name">Name (How you'll be known)</Label>
              <Input 
                id="reg-name" 
                className="bg-gray-900 border-gray-600" 
                value={regData.name} 
                onChange={(e) => setRegData({...regData, name: e.target.value})} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-email">Email</Label>
              <Input 
                id="reg-email" 
                type="email" 
                className="bg-gray-900 border-gray-600" 
                value={regData.email} 
                onChange={(e) => setRegData({...regData, email: e.target.value})} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reg-password">Password (min 8 characters)</Label>
              <Input 
                id="reg-password" 
                type="password" 
                className="bg-gray-900 border-gray-600" 
                value={regData.password} 
                onChange={(e) => setRegData({...regData, password: e.target.value})} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleRegisterAndSubmit} disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Creating Account..." : "Register & Post Question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}