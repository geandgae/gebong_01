{/* <script type="module" src="../../../resources/js/site/pinch-zoom-init.js"></script> 헤드에 */}

import PinchZoom from '../../../resources/js/site/pinch-zoom.min.js';

document.addEventListener('DOMContentLoaded', function () {

	// // 이미지 찾기
	// const guideImages = document.querySelectorAll(".g-img-wrap > div img");
	// guideImages.forEach(img => {
	// 	const closestDiv = img.closest("div");
	// 	closestDiv?.classList.add("g-img-zoom");
	// });

	// const zoomElements = document.querySelectorAll("div.g-img-zoom");

	// 테스트용 로그 (추후 삭제)
	if (zoomElements.length > 0) {
		console.log("test : 핀치줌을 적용할 요소를 찾았습니다:", zoomElements.length, "개의 요소.");
	} else {
		console.log("test : 핀치줌을 적용할 요소를 찾지 못했습니다.");
	}

	zoomElements.forEach((el, index) => {
		try {
			new PinchZoom(el, {});
			el.style.transform = "scale(1) translate(0, 0)";
			// 테스트용 로그 (추후 삭제)
			console.log(`핀치줌 적용됨: 요소 ${index + 1}`);
		} catch (error) {
			// 테스트용 로그 (추후 삭제)
			console.error(`핀치줌 적용 중 오류 발생: 요소 ${index + 1}`, error);
		}
	});
});
