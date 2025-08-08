import { useEffect, useState } from "react";
import SidebarLayout from "../../components/SideBarLayout";
import {
  SIDEBAR_STOCKS_LIST,
  SIDEBAR_MANAGE_STOCK,
  pageHeadingStyle,
} from "../../utils/commonUtils";
import "../../styles/ManageStock/StocksListPageStyle.css";
import { BASE_URL, LIST_STOCKS_ENDPOINT } from "../../utils/endpoints";
import APICall from "../../utils/callApiUtils";
import { useNavigate } from "react-router-dom";
import ToastComponent from "../../components/ToastComponent";
import { toast } from 'react-toastify';
import LoaderModal from "../../components/Loader";
import { useAuth } from "../../contexts/AuthContext";


type dataProps = {
  id: number,
  live_stock_id: string,
  image_url: string,
  breed: string,
  age: string,
  milk_capacity: number,
  parity: number,
  is_pregnant: boolean,
  last_calvation_date: string,
  lactation_month: number,
  purchase_price: number
}

const StocksListPage = () => {
  const [showCollapsed, _] = useState(false);
  const [apiresponse, SetApiResponse] = useState<dataProps[]>([])
  const [ loading, setLoading ] = useState(false)
  const { accessToken, setAccessToken } = useAuth()

  const navigate = useNavigate();

  function onFailureCallBack(message: string) {
    toast.error(message)
  }

  useEffect(() => {
    async function getApiResponse() {
      setLoading(true)
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: LIST_STOCKS_ENDPOINT,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken
      })
      setLoading(false)
      if (response) {
        SetApiResponse(response)
      }
    }
    getApiResponse()
  }, [])

  return (
    <>
    {loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_MANAGE_STOCK}
        optionSelected={SIDEBAR_STOCKS_LIST}
      />
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>
          Stocks List
        </h1>
        <div className="st_lst_animals_list">
          {apiresponse.map((value, index) => (
            <div className="st_lst_animal_card" key={index}>
              <img
                className="st_lst_animal_card_img"
                src={`${BASE_URL}${value.image_url}`}
                alt="image"
              />
              <div
                style={{ margin: "1rem", display: "flex", flexWrap: "wrap", justifyContent: 'space-between' }}
              >
                <div className="st_lst_animal_card_text_container">
                  <p className="st_lst_animal_card_heading">Breed</p>
                  <p className="st_lst_animal_card_text">{value.breed}</p>
                </div>
                <div className="st_lst_animal_card_text_container">
                  <p className="st_lst_animal_card_heading">
                    Lactation Month
                  </p>
                  <p className="st_lst_animal_card_text">
                    {value.lactation_month}
                  </p>
                </div>
                <div className="st_lst_animal_card_text_container">
                  <p className="st_lst_animal_card_heading">Milk Capacity</p>
                  <p className="st_lst_animal_card_text">
                    {value.milk_capacity}
                  </p>
                </div>
                <div className="st_lst_animal_card_text_container">
                  <p className="st_lst_animal_card_heading">
                    Last Calving date
                  </p>
                  <p className="st_lst_animal_card_text">
                    {value.last_calvation_date}
                  </p>
                </div>
                {showCollapsed ? (
                  <>
                    <div className="st_lst_animal_card_text_container">
                      <p className="st_lst_animal_card_heading">
                        Is pregnant
                      </p>
                      <p className="st_lst_animal_card_text">
                        {value.is_pregnant}
                      </p>
                    </div>
                    <div className="st_lst_animal_card_text_container">
                      <p className="st_lst_animal_card_heading">Parity</p>
                      <p className="st_lst_animal_card_text">{value.parity}</p>
                    </div>
                    <div className="st_lst_animal_card_text_container">
                      <p className="st_lst_animal_card_heading">
                        Purchase Price
                      </p>
                      <p className="st_lst_animal_card_text">
                        {value.purchase_price}
                      </p>
                    </div>
                    <div className="st_lst_animal_card_text_container">
                      <p className="st_lst_animal_card_heading">Age</p>
                      <p className="st_lst_animal_card_text">{value.age}</p>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastComponent />
    </>
  );
};

export default StocksListPage;
