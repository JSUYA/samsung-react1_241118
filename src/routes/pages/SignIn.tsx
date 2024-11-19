import { useNavigate, useSearchParams } from 'react-router-dom'

export default function SignInPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    //
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const id = formData.get('id')
    const pw = formData.get('pw')
    if (id && pw) {
      localStorage.setItem('token', '1q2w3e4r')
      const callbackUrl = searchParams.get('callbackUrl')
      navigate(callbackUrl || '/')
    }
    //서버로 보냄
    // const res = await fetch('https://api.asdasds/signin',
    //   headers: {
    //     'X-id':id as string,
    //     'X-Password':pw as string
    //   }
    // )
    // const data = await res.json()
    // if(data.accessToken){
    //   return
    // }
  }

  return (
    <>
      <h1>SignIn Page</h1>
      <form onSubmit={onSubmit}>
        <input
          name="id"
          placeholder="아이디를 입력하세요."
        />
        <br />
        <input
          name="pw"
          placeholder="비밀번호를 입력하세요."
          type="password"
        />
        <br />
        <button type="submit">로그인</button>
      </form>
    </>
  )
}
