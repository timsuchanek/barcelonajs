import React from 'react'
import { PrismaClient } from '@prisma/client'
import { InferGetStaticPropsType } from 'next'

const prisma = new PrismaClient()

export default function Users({
  user,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <pre>
        Name: {user.name}
        <br />
        Email: {user.email}
        <br />
        Posts:{' '}
        {user.posts?.map((p) => (
          <div>{p.title}</div>
        ))}
      </pre>
    </div>
  )
}

export async function getServersideProps() {}

export async function getStaticPaths() {
  const ids = await prisma.user.findMany({
    select: { id: true },
  })

  return {
    paths: ids.map(({ id }) => ({ params: { id: String(id) } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const user = await prisma.user.findOne({
    where: {
      id: Number(params.id),
    },
    include: {
      posts: {
        include: {
          comments: true,
        },
      },
    },
  })
  return {
    props: {
      user,
    },
  }
}
