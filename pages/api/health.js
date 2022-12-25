// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function  handler(req, res) {
  // await new Promise(r => setTimeout(r, 20000))

  res.status(200).json({ health: true, date: new Date() })
}
