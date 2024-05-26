export async function POST(req: Request) {
  return Response.json({ data: 'sample' })
}

export async function GET() {
  return Response.json('get')
}
