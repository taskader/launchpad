import { Node } from "./Node";
import { Trophy, ArrowRight } from "lucide-react";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertSubscriberSchema } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TournamentJoin({ scrollProgress, chapterProgress }: { scrollProgress: number, chapterProgress: number }) {
  const mutation = useCreateSubscriber();
  
  const form = useForm<z.infer<typeof insertSubscriberSchema>>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(data: z.infer<typeof insertSubscriberSchema>) {
    mutation.mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <Node position="center">
      <div className="w-full max-w-md mx-auto glass-panel p-8 rounded-3xl border-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        
        <div className="flex flex-col items-center text-center gap-6 mb-8">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/20">
            <Trophy className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Join the Tournament</h2>
            <p className="text-white/60 text-sm">Compete, create, and climb the leaderboard.</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Enter your email" 
                        {...field} 
                        className="bg-black/40 border-white/10 text-white placeholder:text-white/20 h-12 pl-4 pr-12 rounded-xl focus-visible:ring-cyan-500/50"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs" />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-12 bg-white text-black hover:bg-cyan-400 hover:text-black font-semibold rounded-xl transition-all duration-300"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Joining..." : "Get Early Access"}
              {!mutation.isPending && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>
        </Form>
      </div>
    </Node>
  );
}
