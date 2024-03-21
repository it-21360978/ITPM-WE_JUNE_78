export const color= [
    
    'white',
    'black',
    'red',
    'marun',
    'being',
    'pink',
    'green', 
    'yellow', 
  ];


export const filters = [
{
  id: 'color',
  name: 'Color',
  options: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: true },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
  ],
},
{
  id: 'size',
  name: 'size',
  options: [
    { value: 'S', label: 'S', checked: false },
    { value: 'M', label: 'M', checked: false },
    { value: 'L', label: 'L', checked: true },
    { value: 'XL', label: 'XL', checked: false },
  ],
}
]

export const singleFilter=[
{
    id: 'price',
    name: 'price',
    options: [
      { value: '2000', label: '2000', checked: false },
      { value: '3000', label: '3000', checked: false },
      { value: '4000', label: '4000', checked: true },
      { value: '5000', label: '5000', checked: false },
    ],

},

{
    id: 'stock',
    name: 'Availability',
    options: [
      { value: 'in_stock', label: 'Im Stock', checked: false },
      { value: 'out_of_stock', label: 'Out of Stock', checked: false },
    
    ],
}
]