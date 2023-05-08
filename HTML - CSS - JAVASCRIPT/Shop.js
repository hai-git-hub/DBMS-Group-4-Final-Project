if (document.readyState == 'loading')
    {
        document.addEventListener('DOMContentLoaded', ready)
    }
else
    {
        ready()
    }

function ready()
{
    var removeButton = document.getElementsByClassName('button-remove')
    console.log(removeButton)
        for (var i = 0; i < removeButton.length; i++)
        {
            var button = removeButton[i]
            button.addEventListener('click', removeCartItem)
        }
    
    var quantityInput = document.getElementsByClassName('quantity-input')
        for (var i = 0; i < quantityInput.length; i++)
        {
            var input = quantityInput[i]
            input.addEventListener('change', quantityChanged)
        }
    
    var addToCartButtons = document.getElementsByClassName('item-button')
        for (var i = 0; i < addToCartButtons.length; i++)
        {
            var button = addToCartButtons[i]
            button.addEventListener('click', addToCartClicked)
        }

        document.getElementsByClassName('button-checkout')[0].addEventListener('click', checkoutClicked)
}

function checkoutClicked() {
    alert('Thank you for your purchase!')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateTotal()
}

function removeCartItem(event)
{
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTotal()
}

function quantityChanged(event)
{
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) 
    {
        input.value = 1
    }
    updateTotal()
}

function addToCartClicked(event)
{
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var name = shopItem.getElementsByClassName('item-name')[0].innerText
    var price = shopItem.getElementsByClassName('item-price')[0].innerText
    var imagesSrc = shopItem.getElementsByClassName('item-image')[0].src
    console.log(name, price, imagesSrc)
    addItemToCart(name, price, imagesSrc)
    updateTotal()
}

function addItemToCart(name, price, imagesSrc)
{
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('item-title')
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == name) {
                alert('Item is already added to cart')
                return
            }
        }

    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="item-image" src="${imagesSrc}"> 
            <span class="item-title"> ${name} </span>
        </div>

        <div class="cart-quantity cart-column">
            <input class="quantity-input" type="number" value="1"> 
            <button class="button button-remove" type="button"> Remove </button>
        </div>

        <span class="cart-price cart-column"> ${price} </span>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('button-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateTotal()
{
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++)
    {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$' ,''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('total-price')[0].innerText = '$' + total
}
