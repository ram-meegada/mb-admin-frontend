import React from "react";
import { pageHeadingStyle } from "../../utils/commonUtils";
import LoaderModal from "../../components/Loader";

const ChatWithBujji = () => {
  const [loading, setLoading] = React.useState(false);

  return (
    <>
      {loading && <LoaderModal />}
      <div className="main-page-wrapper-global">
        <h1 style={pageHeadingStyle}>Ask Bujji</h1>
      </div>
    </>
  );
};

export default ChatWithBujji;
