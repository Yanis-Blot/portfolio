export async function POST(req: Request){

    {/*  message doit bien etre dans la request : c'est un contrat api à respecter entre back et front. */}
    const { message } = await req.json()

    if (typeof message !== "string" || message.trim() === ""){
        return Response.json( { error: "No message sent"}, { status: 400})
    }

    return Response.json({
        role: "assistant",
        content: "Template Response."
    })
}