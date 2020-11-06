$.ajax({
    type: 'GET',
    url: '/orders'
})
.then(orders => {
    orders.forEach(order => {
        $('#orders-list').append(`
            <li class="list-group-item py-4 d-flex justify-content-between align-items-center">
                <div>
                    <small class="text-muted">Name:</small> <span class="font-weight-bold">${order.name}</span>
                </div>
                <div>
                    <small class="text-muted">Order:</small> <span class="font-weight-bold">${order.order}</span>
                </div>
            </li>
        `)
    })
})
.catch(e => console.log(e));




// an ajax request is a function that can make a request to servers
// precursor to fetch
// it will always take an object as its argument
// ajax is opinionated. meaning it will handle certain steps for you. you don't have to write JSON.parse()