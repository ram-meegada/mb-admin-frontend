import { useEffect, useState } from 'react'
import LoaderModal from '../../components/Loader'
import SidebarLayout from '../../components/SideBarLayout'
import { pageHeadingStyle, SIDEBAR_EXPENDITURE, SIDEBAR_EXPENDITURE_LIST } from '../../utils/commonUtils'
import TableRendererComponent from '../../components/TableRendererComponent'
import ToastComponent from '../../components/ToastComponent'
import { toast } from 'react-toastify'
import APICall from '../../utils/callApiUtils'
import { useNavigate } from 'react-router-dom'
import { ADD_EXPENDITURE } from '../../utils/endpoints'
import { useAuth } from '../../contexts/AuthContext'


type apiDataProps = {
  category: string,
	parent_category: string,
	amount: number,
	description: string,
	created_at: string
};

const ExpenditureList = () => {
	const navigate = useNavigate();
	const [ loading, setLoading ] = useState(false)
	const [ apiResponse, setApiResponse ] = useState<apiDataProps[]>([])
	const [ currentYearExpenditure, setCurrentYearExpenditure ] = useState("")
  const { accessToken, setAccessToken } = useAuth()

	const tableHeaders = [
	{'name': 'Category', 'type': 'string'},
	{'name': 'Parent Category', 'type': 'string'},
	{'name': 'Amount', 'type': 'price'},
	{'name': 'Description', 'type': 'string'},
	{'name': 'date', 'type': 'string'},
]

	function onFailureCallBack(message: string) {
				toast.error(message)
			}

	useEffect(() => {
    
		async function getApiResponse() {
      setLoading(true)
      const response = await APICall({
        method: "GET",
        Accept: "application/json",
        endPoint: ADD_EXPENDITURE,
        onFailure: onFailureCallBack,
        contentType: "application/json",
        navigate: navigate,
        accessToken: accessToken,
        setAccessToken
      })
      setLoading(false)
      if (response) {
        setApiResponse(response.data)
				setCurrentYearExpenditure(response.current_year_expenditure)
      }
    }
    getApiResponse()
	}, [])

  return (
    <>
		{loading && <LoaderModal />}
      <SidebarLayout
        mainOptionSelected={SIDEBAR_EXPENDITURE}
        optionSelected={SIDEBAR_EXPENDITURE_LIST}
      />
	  <div className="main-page-wrapper-global">
			<h1 style={pageHeadingStyle}>Expenditure List</h1>
			<TableRendererComponent tableHeaders={tableHeaders} apiData={apiResponse} />
			<div
          style={{
            margin: "30px",
            marginTop: 0,
            fontSize: "1.5rem",
            backgroundColor: "var(--hover-red-color)",
            width: 'fit-content',
            padding: '1rem'
          }}
          >
          <p>
            <strong>Current year expenditure:- </strong>
            {currentYearExpenditure}/-
          </p>
        </div>
	  </div>
		<ToastComponent />
	</>
  )
}

export default ExpenditureList