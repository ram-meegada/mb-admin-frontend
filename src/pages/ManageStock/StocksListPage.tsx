import React, { useState } from "react";
import SidebarLayout from "../../components/SideBarLayout";
import {
  SIDEBAR_STOCKS_LIST,
  SIDEBAR_MANAGE_STOCK,
} from "../../utils/commonUtils";
import "../../styles/ManageStock/StocksListPageStyle.css";
import { BASE_URL } from "../../utils/endpoints";

const StocksListPage = () => {
  const [showCollapsed, setShowCollapsed] = useState(false);

  const data = [
        {
            "id": 29,
            "live_stock_id": "B-29",
            "image_url": "/media/images/buffalo_JIyy1hd.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 21 d",
            "milk_capacity": 5.0,
            "parity": 4,
            "is_pregnant": true,
            "last_calvation_date": "2025-03-29",
            "lactation_month": 5,
            "purchase_price": 1.0
        },
        {
            "id": 24,
            "live_stock_id": "B-24",
            "image_url": "/media/images/buffalo_kOashzV.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 1 d",
            "milk_capacity": 8.0,
            "parity": 8,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-16",
            "lactation_month": 5,
            "purchase_price": 50000.0
        },
        {
            "id": 23,
            "live_stock_id": "B-23",
            "image_url": "/media/images/buffalo_SRaLBHr.png",
            "breed": "Bhadawari",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 2.0,
            "parity": 5,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-23",
            "lactation_month": 5,
            "purchase_price": 5.0
        },
        {
            "id": 21,
            "live_stock_id": "B-21",
            "image_url": "/media/images/buffalo_1oQKUt7.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 5.0,
            "parity": 5,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-23",
            "lactation_month": 5,
            "purchase_price": 50000.0
        },
        {
            "id": 19,
            "live_stock_id": "B-19",
            "image_url": "/media/images/buffalo_0HJTY09.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 5.0,
            "parity": 6,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-23",
            "lactation_month": 5,
            "purchase_price": 50000.0
        },
        {
            "id": 18,
            "live_stock_id": "B-18",
            "image_url": "/media/images/buffalo.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 15.0,
            "parity": 5,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-23",
            "lactation_month": 5,
            "purchase_price": 5000.0
        },
        {
            "id": 17,
            "live_stock_id": "B-17",
            "image_url": "/media/media/images/testing.png",
            "breed": "Bhadawari",
            "age": null,
            "milk_capacity": 2.0,
            "parity": 0,
            "is_pregnant": false,
            "last_calvation_date": null,
            "lactation_month": 0,
            "purchase_price": 0.0
        },
        {
            "id": 16,
            "live_stock_id": "B-16",
            "image_url": null,
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 4.0,
            "parity": 5,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-14",
            "lactation_month": 5,
            "purchase_price": 50000.0
        },
        {
            "id": 15,
            "live_stock_id": "B-15",
            "image_url": null,
            "breed": "Murrah",
            "age": "1 y, 6 m, 0 d",
            "milk_capacity": 10.0,
            "parity": 2,
            "is_pregnant": false,
            "last_calvation_date": "2025-01-31",
            "lactation_month": 3,
            "purchase_price": 50000.0
        },
        {
            "id": 24,
            "live_stock_id": "B-24",
            "image_url": "/media/images/buffalo_kOashzV.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 1 d",
            "milk_capacity": 8.0,
            "parity": 8,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-16",
            "lactation_month": 5,
            "purchase_price": 50000.0
        },
        {
            "id": 23,
            "live_stock_id": "B-23",
            "image_url": "/media/images/buffalo_SRaLBHr.png",
            "breed": "Bhadawari",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 2.0,
            "parity": 5,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-23",
            "lactation_month": 5,
            "purchase_price": 5.0
        },
        {
            "id": 21,
            "live_stock_id": "B-21",
            "image_url": "/media/images/buffalo_1oQKUt7.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 5.0,
            "parity": 5,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-23",
            "lactation_month": 5,
            "purchase_price": 50000.0
        },
        {
            "id": 19,
            "live_stock_id": "B-19",
            "image_url": "/media/images/buffalo_0HJTY09.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 5.0,
            "parity": 6,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-23",
            "lactation_month": 5,
            "purchase_price": 50000.0
        },
        {
            "id": 18,
            "live_stock_id": "B-18",
            "image_url": "/media/images/buffalo.png",
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 15.0,
            "parity": 5,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-23",
            "lactation_month": 5,
            "purchase_price": 5000.0
        },
        {
            "id": 17,
            "live_stock_id": "B-17",
            "image_url": "/media/media/images/testing.png",
            "breed": "Bhadawari",
            "age": null,
            "milk_capacity": 2.0,
            "parity": 0,
            "is_pregnant": false,
            "last_calvation_date": null,
            "lactation_month": 0,
            "purchase_price": 0.0
        },
        {
            "id": 16,
            "live_stock_id": "B-16",
            "image_url": null,
            "breed": "Jaffarabadi",
            "age": "0 y, 3 m, 8 d",
            "milk_capacity": 4.0,
            "parity": 5,
            "is_pregnant": false,
            "last_calvation_date": "2025-03-14",
            "lactation_month": 5,
            "purchase_price": 50000.0
        },
        {
            "id": 15,
            "live_stock_id": "B-15",
            "image_url": null,
            "breed": "Murrah",
            "age": "1 y, 6 m, 0 d",
            "milk_capacity": 10.0,
            "parity": 2,
            "is_pregnant": false,
            "last_calvation_date": "2025-01-31",
            "lactation_month": 3,
            "purchase_price": 50000.0
        },
    ];
  return (
    <>
      <SidebarLayout
        mainOptionSelected={SIDEBAR_MANAGE_STOCK}
        optionSelected={SIDEBAR_STOCKS_LIST}
      />
      <div className="st_lst_main">
        <h1 style={{ margin: 0, alignSelf: "center", color: "white" }}>
          Stocks List
        </h1>
        <div className="st_lst_animals_list">
          {data.map((value, index) => (
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
    </>
  );
};

export default StocksListPage;
