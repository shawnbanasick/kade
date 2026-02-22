const SuccessNotification = () => {
  return (
    <div className="absolute left-[150px] bottom-0 z-[9999] w-[calc(100vw-188px)] bg-[rgba(144,238,144,1)] h-[50px] px-[10px] font-[Helvetica,sans-serif] text-[20px] flex justify-between items-center rounded-[4px]">
      <p>Data loaded. Go to the Data section to confirm.</p>
    </div>
  );
};

export default SuccessNotification;
