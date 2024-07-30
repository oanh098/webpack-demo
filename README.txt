June/ 12 
Viết tóm tắt cách font-family được tổ chức.
- file _sass-variables có $font-family-sans-serif gọi là "font stack" chứa nhiều font 
đề phòng tr/h font yêu cầu ko hiển thị được sẽ lấy font trong "font stack"
- file bootstrap/scss/root lưu các biến global, ở đâu cũng nhìn thấy đc.
Có dòng code:   --#{$prefix}font-sans-serif: #{inspect($font-family-sans-serif)};
thì tại _css-var sẽ tạo  --bs-font-sans-serif: 'Poppins', sans-serif; 
(--bs-font-sans-serif = --#{$prefix}font-sans-serif)
- file _base.scss sẽ 
body {
    font: 1rem/1.5 var(--bs-font-sans-serif);
    overflow-x: hidden;
}
_____________________________
June/ 14
Nên để ý khi nào đặt biến trong file _sass-variable,
 khi nào đặt biến trong file nameComponent.scss (vd: _navbar.scss). 
 Chỗ lưu biến khác nhau, sẽ bị override hay ko. 
_____________________________
June/ 19
Install js cho phan toggler cua navbar
_____________________________
June/20 
Thay thế html-webpack-plugin bằng html-bundler-webpack-plugin vì:
"This plugin is an advanced replacement of html-webpack-plugin and many other plugins and loaders."
_____________________________
July/8
chỉnh h1 4rem, nhưng web chỉ hiển thị 2.5rem
_____________________________
July/9
button outline bolder...
_____________________________
July/25
Isotope is a JavaScript library that helps in creating dynamic, 
filterable, and sortable layouts





