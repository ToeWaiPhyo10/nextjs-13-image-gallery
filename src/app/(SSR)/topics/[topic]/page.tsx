import { UnsplashImage } from "@/models/unsplash-image";
import Image from "next/image";
import React from "react";
import styles from "./topicPage.module.css";
import { Alert } from "@/components/bootstrap";
import { Metadata } from "next";
// export const revalidate = 0;
interface PageProps {
  params: { topic: string };
  //   searchParams: { [key: string]: string | string[] | undefined };
}
//to disable static params
// export const dynamicParams = false;

//generate data at build time
export async function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export function generateMetadata({ params: { topic } }: PageProps): Metadata {
  return {
    title: topic + " - NextJS 13.4 Image Gallery",
  };
}

export default async function TopicPage({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );
  const images: UnsplashImage[] = await response.json();
  return (
    <div>
      <Alert>
        This page uses <strong>generateStaticParams</strong> to render and cache
        static pages at build time, even though the URL has a dynamic parameter.
        Pages that are not included in generateStaticParams will be fetched &
        rendered on first access and then{" "}
        <strong>cached for subsequent requests</strong> (this can be disabled).
      </Alert>
      <h1>{topic}</h1>
      {images.map((data) => (
        <Image
          src={data.urls.raw}
          height={250}
          width={250}
          alt={data.description}
          key={data.urls.raw}
          className={styles.image}
        />
      ))}
    </div>
  );
}
