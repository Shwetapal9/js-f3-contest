


async function fetchdata() {
    try {
      let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
      let data = await response.json();
      addCoinsOntoWebpage(data);
    } catch (error) {
      alert("Error occurred:", error);
    }
  }

function sortbymktCap(){


}

function search(){
    const searchInput = document.getElementById("search");
    const searchTerm = searchInput.value.toLowerCase().trim();
  
    let results= fetchdata().then(coins => {
      const filteredCoins = coins.filter(
        coin =>
          coin.name.toLowerCase().includes(searchTerm) ||
          coin.symbol.toLowerCase().includes(searchTerm)
        )
    });
    addCoinsOntoWebpage(results);
}

const container = document.getElementsByTagName("tbody")[0];
function addCoinsOntoWebpage(result){

    for( let i=0 ;i< result.length; i++)
    {
        let coin = result[i];
        let innerData=`
                        <td id="logo">
                            <img src=${coin.image}>
                            <span>${coin.name}</span>
                        </td>
                        <td>${coin.symbol.toUpperCase()}</td>
                        <td>$${coin.current_price}</td>
                        <td>$${coin.total_volume}</td>
                        <td>${Math.round(coin.market_cap_change_percentage_24h*100)/100}%</td>
                        <td>Mkt Cap:$${coin.market_cap}</td>` 
    let tablerow = document.createElement('tr');
    tablerow.innerHTML=innerData;
    container.appendChild(tablerow);
    }

}