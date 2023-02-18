// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  const API_KEY = process.env.PROPERTYDATA_API_KEY

  const apiRes = await fetch(`
    https://api.propertydata.co.uk/rents?key=${API_KEY}&postcode=${req.query.p}&bedrooms=${req.query.b}
  `)
  
  const json = await apiRes.json()

  res.status(200).json({ json })
}
