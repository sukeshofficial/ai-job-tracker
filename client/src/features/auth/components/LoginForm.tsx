import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Mail, ArrowRight, Loader2 } from "lucide-react";
import { loginSchema, type LoginValues } from "../types/authSchema";
import { useLogin } from "@/services/authService";
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

const LoginForm = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginValues) => {
    setIsSubmitting(true);
    try {
      await loginMutation.mutateAsync(values);
      toast.success("Welcome back!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-[440px] space-y-6">
      <header className="space-y-1 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white font-mono">Welcome back</h2>
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-400">Continue your journey</p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className={cn(
            "space-y-6 rounded-3xl border border-white/5",
            "bg-zinc-900/30 p-8 shadow-2xl backdrop-blur-sm"
          )}>
            <SocialAuth />

            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Email or Username</FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600 group-focus-within:text-indigo-400 transition-colors" />
                      <Input
                        {...field}
                        placeholder="Enter email or username"
                        className="h-11 rounded-full border-zinc-800 bg-zinc-950/50 pl-11 text-sm text-white focus-visible:ring-indigo-500/20"
                      />
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

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-full bg-indigo-600 hover:bg-indigo-700 text-sm font-bold uppercase tracking-wider text-white transition-all"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="flex items-center gap-2">Sign In <ArrowRight className="h-4 w-4" /></span>
              )}
            </Button>
          </div>
        </form>
      </Form>

      <footer className="text-center text-sm text-zinc-500">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300 font-bold">
          Create account
        </Link>
      </footer>
    </div>
  );
};

export default LoginForm;
