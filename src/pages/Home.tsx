import Banner from "../components/Banner";
import MainCategory from "../components/MainCategory";
import SubCategory from "../components/SubCategory";

const Home = () => {
  return (
    <div>
      <Banner />
        <MainCategory title="アクション"/>
        <SubCategory 
          genreId={2}
          title="アドベンチャー"
        />
        <SubCategory 
          genreId={4}
          title="コメディ"
        />
    </div>
  )
}

export default Home