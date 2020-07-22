const { PrismaClient } = require('@prisma/client')

async function main() {
  const prisma = new PrismaClient({
    errorFormat: 'pretty',
  })

  const res = await prisma.user.create({
    data: {
      email: 'bob2@hey.com',
      name: 'Bob',
      posts: {
        create: [
          {
            content: 'Lorem',
            title: 'Ipsum',
            comments: {
              create: [
                {
                  title: 'comment title',
                },
              ],
            },
          },
          {
            content: 'Lorem 2',
            title: 'Ipsum 2',
            comments: {
              create: [
                {
                  title: 'comment title 2',
                },
              ],
            },
          },
        ],
      },
    },
  })
  console.log(res)
  prisma.disconnect()
}

main()
