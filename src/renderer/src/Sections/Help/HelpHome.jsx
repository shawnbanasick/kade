const HelpSection = () => {
  return (
    <div className="bg-white p-[50px] overflow-auto">
      <h2>KADE Help File and User Manual</h2>
      <hr />
      <br />
      <h4>Click on the tabs above for section-specific FAQs and user information</h4>
      <br />
      <br />
      <br />
      <p>A more detailed user guide (with video) is available online here: </p>
      <div className="grid h-[120px] w-[180px] items-center justify-center bg-[#d6dbe0] rounded-[5px] text-[22px] mt-[30px] ml-[100px] mr-[3px] mb-[3px] shadow-[0_2px_2px_0_black] text-center select-none leading-[1.2] hover:bg-[#abafb3] active:shadow-[inset_0_0_1px_0_black] active:ml-[97px]">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/shawnbanasick/kade/wiki"
          className="text-black hover:text-black"
        >
          KADE Online User Manual
        </a>
      </div>
    </div>
  );
};

export default HelpSection;
