export const POST = async (NextRequest) => {
  try {
    const body = await NextRequest.json();
    const { name, username, password } = body;

    if (!name || !username || !password) {
      return new Response("name, username and password is required", {
        status: 401,
      });
    }

    
  } catch (error) {}
};
