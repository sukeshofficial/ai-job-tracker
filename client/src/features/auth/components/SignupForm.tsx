import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Mail, User, AtSign, ArrowRight, Loader2 } from "lucide-react";
import { signupSchema, type SignupValues } from "../types/authSchema";
import { useSignup } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import PasswordInput from "./PasswordInput";
import SocialAuth from "./SocialAuth";
import { cn } from "@/lib/utils";

const SignupForm = () => {
  const navigate = useNavigate();
  const signupMutation = useSignup();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupValues) => {
    setIsSubmitting(true);
    try {
      await signupMutation.mutateAsync(values);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[480px] space-y-6">
      <header className="space-y-1 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white font-mono">Create account</h2>
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">Join the ecosystem</p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className={cn(
            "space-y-6 rounded-3xl border border-white/5",
            "bg-zinc-900/30 p-8 shadow-2xl backdrop-blur-sm"
          )}>
            <SocialAuth />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">First Name</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                        <Input {...field} placeholder="John" className="h-11 rounded-full border-zinc-800 bg-zinc-950/50 pl-11 text-sm text-white focus-visible:ring-indigo-500/20" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Last Name</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                        <Input {...field} placeholder="Doe" className="h-11 rounded-full border-zinc-800 bg-zinc-950/50 pl-11 text-sm text-white focus-visible:ring-indigo-500/20" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Username</FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                      <Input {...field} placeholder="johndoe" className="h-11 rounded-full border-zinc-800 bg-zinc-950/50 pl-11 text-sm text-white focus-visible:ring-indigo-500/20" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Email Address</FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                      <Input {...field} placeholder="johndoe@example.com" className="h-11 rounded-full border-zinc-800 bg-zinc-950/50 pl-11 text-sm text-white focus-visible:ring-indigo-500/20" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="••••••••" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} placeholder="••••••••" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-sm font-bold uppercase tracking-wider text-white transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">Create Account <ArrowRight className="h-4 w-4" /></span>
              )}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300 font-bold">
          Sign in
        </Link>
      </footer>
    </div>
  );
};

export default SignupForm;
