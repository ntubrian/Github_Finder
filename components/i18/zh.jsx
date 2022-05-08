const zh = ({ toggle }) => {
  //   useEffect(() => {
  //     console.log({ router });
  //   });

  return (
    <div
      className={`text-white text-base ${
        toggle ? "font-extrabold text-[#4b81ad]" : ""
      }`}
    >
      中文
    </div>
  );
};

export default zh;
