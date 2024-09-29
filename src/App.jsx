import React, { useState, useMemo } from 'react';

const productsData = [
  { id: 1, name: 'กระเป๋า', price: 3000, image: 'กระเป๋า.jpg' },
  { id: 2, name: 'แก้วน้ำ', price: 79, image: 'แก้วน้ำ.jpg' },
  { id: 3, name: 'ดินสอ HB', price: 79, image: 'ดินสอ.jpg' },
  { id: 4, name: 'สร้อยคอ', price: 150, image: 'สร้อยคอ.jpg' },
  { id: 5, name: 'หมอนข้าง', price: 150, image: 'หมอนข้าง.jpg' },
  { id: 6, name: 'สร้อยข้อมือ', price: 750, image: 'สร้อยข้อมือ.jpg' },
  { id: 7, name: 'ลิปสติก', price: 299, image: 'ลิปสติก.jpg' },
  { id: 8, name: 'แว่นตาอัจฉริยะ', price: 17900, image: 'แว่นตาอัจฉริยะ.jpg' },
  { id: 9, name: 'น้ำหอม', price: 1790, image: 'น้ำหอม.jpg' },
  { id: 10, name: 'นาฬิกา galaxy watch ', price: 179, image: 'นาฬิกา.jpg' },
  { id: 11, name: 'ถังขยะ', price: 199, image: 'ถังขยะ.jpg' },
  { id: 12, name: 'รองเท้าผ้าใบ', price: 599, image: 'รองเท้า.jpg' },
  { id: 13, name: 'พัดลมตั้งพื้น', price: 650, image: 'พัดลม.jpg' },
  { id: 14, name: 'ชุดออกกำลังกาย', price: 199, image: 'ชุดออกกำลังกาย.jpg' },
  { id: 15, name: 'samsung galaxy s24 ultra', price: 39999, image: 'มือถือ.jpg' },
  { id: 16, name: 'หูฟังไร้สาย', price: 2500, image: 'หูฟังไร้สาย.jpg' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleApplyDiscount = (coupon) => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(0.1);
      setDiscountError('');
    } else {
      setDiscountError('Invalid coupon code.');
    }
  };

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  const totalWithShipping = useMemo(() => {
    return total > 0 ? total + 100 - total * discount : 0;
  }, [total, discount]);

  return (
    <div className="App bg-blue-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Boonpa Shop</h1>

      {/* Product grid in 4 columns */}
      <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 p-8">
        {productsData.map((product) => (
          <div key={product.id} className="product-card border p-6 bg-blue-500 hover:shadow-lg transition-shadow flex flex-col items-center rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="mb-2 w-36 h-36 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold text-black">{product.name}</h2>
            <p className="text-lg text-black">Price: {product.price}฿</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-700 text-white px-4 py-2 mt-4 rounded hover:bg-blue-800 transition w-3/4"
              aria-label={`Add ${product.name} to cart`}
            >
              เพิ่มลงในตะกร้า
            </button>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-center mt-12 text-gray-800">ตะกร้าสินค้า</h2>
      <div className="cart p-4 border-t mt-6 bg-white rounded-lg shadow-lg">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center border p-2 my-2 bg-gray-50 rounded">
              <span className="font-medium text-gray-800">{item.name}</span>
              <div className="flex items-center">
                <label htmlFor={`quantity-${item.id}`} className="mr-2 text-gray-600">Qty:</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="border w-12 p-1 text-center"
                />
              </div>
              <span className="text-gray-600">{item.price * item.quantity}฿</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="bg-red-500 text-white px-3 py-1 ml-2 rounded hover:bg-red-600 transition"
                aria-label={`Remove ${item.name}`}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">รถเข็นของคุณ</p>
        )}
        <div className="mt-4 p-4 bg-gray-100 rounded shadow-md">
          <p>รวม: {total}฿</p>
          <p>ค่าจัดส่ง: 100฿</p>
          <p>ส่วนลด: {discount * 79}%</p>
          <p className="font-bold">รวมค่าจัดส่ง: {totalWithShipping}฿</p>

    
        </div>
      </div>
    </div>
  );
}

export default App;
