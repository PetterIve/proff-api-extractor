const fetch = require('node-fetch');

const byEmployees = (acc, curr) => {
    return acc + parseInt(curr.numberOfEmployees);
};

const fetchByUrl = async (url, numberOfEmployees) => {
    const res = await fetch(url);
    const json = await res.json();
    const resultList = json.createListSearchResult.resultList;
    const noEmployees = resultList.reduce(byEmployees, numberOfEmployees);
    console.log(noEmployees);
    const nextUrl = json.createListSearchResult.pagination.next;
    if (nextUrl) {
        return fetchByUrl(`https://www.proff.no/laglister/${nextUrl.href}/?view=json`, noEmployees);
    } else {
        return noEmployees;
    }
};

fetchByUrl('https://www.proff.no/laglister?ef=1&et=28037&i=p296&i=p16684&phone=false&email=false&address=false&view=json', 0)
    .then(result => console.log(result));