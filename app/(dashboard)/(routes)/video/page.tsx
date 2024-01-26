"use client"
import { VideoIcon } from "lucide-react"

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
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";


const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
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
      setVideo(undefined);
      const response = await axios.post("/api/video", values);
      setVideo(response.data[0]);

      form.reset();
    } catch (error: any) {
      // TODO: Open pro modal.
      console.log(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
        <Heading
        title="Video Generation"
        description="Transform your ideas into reality by creating innovative videos with AI"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                        placeholder="Video ideas... e.g. Clown fish swimming in the desert."
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
          {!video && !isLoading && <Empty lable="No Video Generated..." />}
          {video && (
            <video controls className="w-full mt-8 aspect-video rounded-lg border bg-blck">
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoPage