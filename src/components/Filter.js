// function Filter() {
//   useEffect(() => {
//     const getPlanets = async () => {
//       const results = await fetchAPI();
//       results.forEach((result) => {
//         delete result.residents;
//       });
//     };
//     getPlanets();
//     const filterResults = getPlanets.filter((searching) => (
//       searching.toLowerCase().includes(searchTerm)));
//     setSearchResults(filterResults);
//     // getPlanets();
//   }, [searchTerm]);
