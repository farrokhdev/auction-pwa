import React , {useState , useEffect} from "react";
import authService from "../../../services/auth.service";
import CardTicket from "./CardTicket";
import ModalDetailTicket from "./ModalDetailTicket";

function AccountTickets() {

 
  const [ticketList, setTicketList] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [ticketDetial, setTicketDetial] = useState()



  console.log("ticketDetial --->>" , ticketDetial);


  const showModal = (id) => {

      authService.ticketDetial(id)
      .then(res => {
        setTicketDetial(res.data.data.result)
      })
    
    setTimeout(() => {
      setIsModalVisible(true);
    }, 300);

  };

  useEffect(() => {
    getTicketList()
  }, [])

  const getTicketList = () => {
    authService.ticketBox()
    .then(res => {
      setTicketList(res.data.data.result)
    })
  }



  return (
    <React.Fragment>
      <div id="pills-ticket" role="tabpanel" aria-labelledby="pills-ticket-tab">
        <button type="button" class="btn-main">
          <i class="fal fa-plus"></i>تیکت جدید
        </button>

        { ticketList?.length ? ticketList?.map( ticket => (
            <React.Fragment key={ticket?.id}>

              <CardTicket 
                id={ticket?.id}
                title={ticket?.title} 
                body={ticket?.body}
                showModal={showModal}
              />

            </React.Fragment>
        )) : null }
          
      <ModalDetailTicket 
          isModalVisible={isModalVisible} 
          setIsModalVisible={setIsModalVisible}
          ticketDetial={ticketDetial}
      />
          

      </div>
    </React.Fragment>
  );
}

export default AccountTickets;
