"use client";
import { CodeIcon } from "lucide-react";
import { useForm } from "react-hook-form";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/Heading";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import { BotAvatar } from "@/components/BotAvatar";
import ReactMarkdown from "react-markdown";


const CodePage = () => {
  
  const [isAllowed, setIsAllowed] = useState(true);
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });



  // tracking the loading state (NOT by useState)
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };

      const newMessages = [...messages, userMessage];
      setMessages((current) => [...current, userMessage]);

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, response.data]);
      setIsAllowed(true);

      form.reset();
    } catch (error: any) {
      // TODO: Open pro modal.
      console.log(error);
      if (error.response.status === 403) {
        setIsAllowed(false);
        form.reset();
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Ask AI to write code for you in any programming language!"
        icon={CodeIcon}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" rounded-md border w-full p-4 px-3 md:px-6 focus-within: shadow-sm grid grid-cols-12 gap-2"
            >
              {/* Below field means onChange, onBlur, value, disabled, name, ref which are handled byshadcn and react-hook-form */}
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className=" col-span-12 lg:col-span-10 2xl:col-span-11">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="e.g. Simple toggle button using react-hooks."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 2xl:col-span-1 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <Empty lable="No Code Sinppets..." />
          )}
          <div className="flex flex-col-reverse gap-y-4 pb-12">
            {messages &&
              messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-4 md:p-8 w-full flex items-start gap-x-2 md:gap-x-8 rounded-lg",
                    message.role === "user"
                      ? "bg-white border border-black/10"
                      : "bg-muted"
                  )}
                >
                  {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
                  <div className="flex flex-col overflow-hidden">
                    <p className="font-bold text-sm md:text-base">
                      {message.role === "user" ? "You" : "Prodigy"}
                    </p>
                    {message.role === "user" ? (
                      <p className="text-sm">
                        <>{message.content}</>
                      </p>
                    ) : (
                      <ReactMarkdown
                        components={{
                          pre: ({ node, ...props }) => (
                            <div className="overflow-auto rounded-lg w-full py-2">
                              <pre {...props} />
                            </div>
                          ),
                          code: ({ node, ...props }) => (
                            <div className="bg-black/10 rounded-lg p-3 md:p-4 w-fit relative cursor-pointer"  >
        
                              <code {...props} />
                            </div>
                          ),
                        }}
                        className="text-sm overflow-hidden leading-7 "
                        
                      >
                        {message.content}
                      </ReactMarkdown>

                   
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;

