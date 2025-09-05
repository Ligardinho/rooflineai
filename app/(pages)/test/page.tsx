export default async function Page() {
    const res = await fetch(`https://email-api-hono.onrender.com/read`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "3ZUuPHuNReHkhXyWj9bRQyhX"
        },
        body: JSON.stringify({
            "key": "3ZUuPHuNReHkhXyWj9bRQyhX",
            "apiId": "api_4ajJF7C6USYjqZZc",
            "email": "jairampranavwork@gmail.com",
            "password": "kjxx awwh xyxj eolp",
            "since": "August 29, 2025"
        })
    })
    const data = await res.json()
    
    console.log(data)
  
    return (
        <div>
            {data?.map((item: any) => (
                <div key={item.date}>
                    <h1>{item.subject}</h1>
                    <p>{item.body}</p>
                </div>
            ))}
        </div>
    )
}