export async function findUserByNetId(netId: string) {
  return await prisma.user.findFirst({
    where: { netId },
    include: { college: true },
  })
}
