const en = ({ toggle }) => {
  //   useEffect(() => {
  //     console.log({ router });
  //   });

  return (
    <div
      className={`text-white text-base ${
        toggle ? "" : "font-extrabold	 text-[#4b81ad]"
      }`}
    >
      English
    </div>
  );
};

export default en;
