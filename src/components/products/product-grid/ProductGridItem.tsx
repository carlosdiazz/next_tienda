'use client'

import { RouterApp } from "@/config";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const [displayImage, setDispalyImage] = useState(product.images[0])

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`${RouterApp.product}/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDispalyImage(product.images[1])}
          onMouseLeave={() => setDispalyImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-600"
          href={`${RouterApp.product}/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
