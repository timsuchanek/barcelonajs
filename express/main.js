const { PrismaClient } = require('@prisma/client')

async function main() {
  const client = new PrismaClient()
  const res = await client.user.create({
    data: {
      email: 'bob@hey.com',
      name: 'Bobby Brown',
      posts: {
        create: [
          {
            title: 'My first post',
            content: 'This is some content',
            comments: {
              create: {
                text: 'A comment!',
              },
            },
          },
          {
            title: 'My second post',
            content: 'This is some other content',
            comments: {
              create: {
                text: 'Another comment!',
              },
            },
          },
        ],
      },
    },
  })
  console.log(res)
  client.disconnect()
}

main()
