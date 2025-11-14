import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {format, parseISO } from "date-fns";


interface BlogCardProps {
  title: string;
  summary: string;
  published_at: string;
  thumbnail_image: string;
  slug:string
}

const BlogCard = ({ title, summary,slug, published_at, thumbnail_image }: BlogCardProps) => {
  return (
    <Card className="hover:shadow-lg transition rounded-2xl overflow-hidden flex flex-col">
      <img src={thumbnail_image} alt={title} className="w-full h-48 object-cover" />
      <CardHeader>
       <Link href={`/blogs/${slug}`}>

       <CardTitle className="text-xl hover:text-primary">{title}</CardTitle>
       </Link>
        <p className="text-sm text-muted-foreground">

        {format(parseISO(published_at), "dd MMM yyyy")}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <p className="text-gray-600 mb-4">{summary.slice(0, 100)}...</p>
        <div className="mt-auto">

        <Link href={`/blogs/${slug}`} >
          <Button variant="outline" >Read More</Button>
        </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
