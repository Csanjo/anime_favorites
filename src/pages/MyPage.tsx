import "./MyPage.css"

const MyPage = () => {
  return (
    <>
      <div className="mypage-container">
        <div className="mypage-top">
          <h2>アカウント</h2>
          <p>メンバー登録年月日：2023年11月29日</p>
        </div>
        <hr />
        <div className="mypage-info">
          <p>メンバーシップとお支払い</p>
          <p>
            <p>メールアドレス:aaaaaaaaaa@.com
            <br/>電話番号:000-0000-0000
            <br/>名前:user</p>
          </p>
        </div>
          <hr />
        <div className="mypage-info">
          <p>プランの詳細情報</p>
          <p>スダンダード</p>
        </div>
          <hr />
        <div className="mypage-info">
          <p>セキュリティとプライバシー</p>
          <p>このアカウントに最近アクセスしたアカウントへのアクセスの管理等<br/>を行います</p>
        </div>
          <hr />
        <div className="mypage-info">
          <p>ログアウト</p>
        </div>
          <hr />
      </div>
    </>
  )
}
export default MyPage