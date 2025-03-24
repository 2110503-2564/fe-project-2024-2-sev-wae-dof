export default async function userRegister(userName:string,userTel:string,userEmail:string,userPassword:string){
    const response = await fetch("https://campground-backend-red.vercel.app/api/v1/auth/register",{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({
            name : userName,
            tel : userTel,
            email : userEmail,
            password : userPassword,
            role : "user"
        })
    })

    console.log('Response:', response);

    if(!response.ok){   
        const errorData = await response.json();
        console.log('Error Data:', errorData); // ตรวจสอบข้อผิดพลาดที่เซิร์ฟเวอร์ส่งกลับ
        throw new Error(errorData?.message || "Registration failed");
    }

    return await response.json()
}