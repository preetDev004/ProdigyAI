"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Jones",
    avatar: "s",
    title: "Marketing Manager",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D",
    description:
      "ProdigyAI's AI-powered tools make creating marketing content a breeze!",
  },
  {
    name: "David Lee",
    avatar: "d",
    title: "Web Developer",
    imageUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vZGVsfGVufDB8fDB8fHww",
    description:
      "Wow! Really the code generation is a game-changer for my workflow. It saves me tons of time!",
  },
  {
    name: "Maria Garcia",
    avatar: "m",
    title: "Musician",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWx8ZW58MHx8MHx8fDA%3D",
    description:
      "ProdigyAI's music generation is incredibly inspiring. I love using it to spark new creative ideas.",
  },
  {
    name: "Alexei Petrov",
    avatar: "a",
    title: "Graphic Designer",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bW9kZWwlMjBtYW58ZW58MHx8MHx8fDA%3D",
    description:
      "Its image generation is perfect for creating unique and eye-catching visuals for my projects.",
  },
  {
    name: "Li Wang",
    avatar: "l",
    title: "Content Writer",
    imageUrl: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?dpr=2&h=294&w=294&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXRodW1ibmFpbHx8NDcwMDY1N3x8ZW58MHx8fHx8",
    description:
      "The chat function is a lifesaver for overcoming writer's block. It helps me generate fresh ideas and refine my writing.",
  },
  {
    name: "Aisha Khan",
    avatar: "a",
    title: "Video Editor",
    description:
      "Video generation of this tool is amazing for creating quick and engaging video content.",
    imageUrl: "https://images.unsplash.com/photo-1570015652016-f4d63e51b2c5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3w0NzE4MzYyfHxlbnwwfHx8fHw%3D",
  },
];
const LandingContent = () => {
  return (
    <div className="px-10 pb-20 mt-8">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {testimonials &&
          testimonials.map((item, index) => (
            <Card key={index} className="bg-[#192339] border-none text-white">
              <CardHeader>
                <CardTitle>
                  <div className="flex items-center justify-between gap-x-2">
                    <div className="flex gap-x-2 items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage className="object-cover" src={item?.imageUrl} />
                        <AvatarFallback>{item.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg">{item.name}</p>
                        <p className="text-sm text-zinc-400">{item.title}</p>
                      </div>
                    </div>
                    <div>
                      <Quote />
                    </div>
                  </div>
                </CardTitle>
                <CardContent className="pt-4 px-0">
                  {item.description}
                </CardContent>
              </CardHeader>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default LandingContent;
