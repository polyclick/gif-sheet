'use strict'

import angular from 'angular'
import _ from 'lodash'
import Exploder from 'polyclick/x-gif/src/exploder.js'

import 'jariz/vibrant.js/dist/Vibrant.min.js'

var gifSheetApp = angular.module('gifSheetApp', [ ])
var SERVER_URL = 'http://localhost:3000'

gifSheetApp.controller('MainController', [ '$http', '$timeout', '$scope', function($http, $timeout, $scope) {
  var self = this

  // consts
  self.RANDOM_GIF_URLS = [
    'https://38.media.tumblr.com/9d535e50984adbd57e8f5012d292ae06/tumblr_nipm21HSkS1suqp7no1_400.gif',
    'https://33.media.tumblr.com/bc4c9f736521fbe5247a4282e9846cf3/tumblr_n4mrgu1H601qkwe6ao1_500.gif',
    'https://38.media.tumblr.com/7fe9098cae355cef72e99f1484ee8d4c/tumblr_mkji5pPYqk1r4mh0bo1_r1_500.gif',
    'https://33.media.tumblr.com/724a51968d0332bcaac2cc53b1a11516/tumblr_nue47xerj71uo7ripo1_400.gif',
    'https://33.media.tumblr.com/ec5f37d1d333ac629896ff8417f548b8/tumblr_nu8c99mSMA1tiyj7vo1_500.gif',
    'https://38.media.tumblr.com/be84f9fc951a8a34e3cc07f21e7a4eda/tumblr_noegs0dIEA1rpco88o1_500.gif',
    'https://31.media.tumblr.com/59fe1da2859d8ee5347579c3b8c2151c/tumblr_nvfvrfytk41rpco88o1_500.gif',
    'https://38.media.tumblr.com/7bd7f1ab3fc44e14381cab74bac237ba/tumblr_nqxxbvk4s51qhrm3lo1_500.gif',
    'https://33.media.tumblr.com/d89e848a728850865ec77632613963fe/tumblr_nly3doXzZm1qd479ro1_1280.gif',
    'https://33.media.tumblr.com/120c787f6c25ee86adae797c3e1a2927/tumblr_nun7csXHeL1uc71mpo1_400.gif',
    'https://31.media.tumblr.com/d01f243e79b6c32dc9f21ec84a4c77b0/tumblr_nuo6um1BFo1qc66bjo1_500.gif',
    'https://31.media.tumblr.com/e0a10f408390284aad21ae869aa618de/tumblr_nt96z1oOiG1u1ad2qo1_500.gif',
    'https://31.media.tumblr.com/cfdb0165cac36114bd577872923708ee/tumblr_nscrn8Jk0J1td30guo1_500.gif',
    'https://33.media.tumblr.com/0345649dcff04994417f2abf8a31e0aa/tumblr_nrwqdffZGS1tsgoaxo1_500.gif',
    'https://38.media.tumblr.com/a3d931cdee7581c58bda55c68b648497/tumblr_ntcgafGV291tdxtc7o1_500.gif',
    'https://33.media.tumblr.com/a4f0a9113dc2ea170a5f64c884bd8ba0/tumblr_ntyqgeDOzy1uzv9o2o1_500.gif',
    'https://31.media.tumblr.com/b2c17041965076dc9812e51851f4d763/tumblr_nb70ow6wyX1s4fz4bo1_r2_500.gif',
    'https://31.media.tumblr.com/f1000901153a268ab1bf96ab91199778/tumblr_nuw0x9ExtA1ss6ifoo1_1280.gif',
    'https://38.media.tumblr.com/3fddc37e89a7816b9d0c87579d846927/tumblr_nvzlc6lJ1e1tsgoaxo1_400.gif',
    'https://31.media.tumblr.com/857cda58220e4e0385b50cd1eeb7e1a1/tumblr_nupppkndhc1trjy1to1_500.gif',
    'https://33.media.tumblr.com/306774e46648d466b3db79d32e71384a/tumblr_noejw1lFh61u17yx1o1_500.gif',
    'https://38.media.tumblr.com/6e2ad70241d16e492b171847c933e440/tumblr_n6nrq8wWeH1s46p8ao1_500.gif',
    'https://38.media.tumblr.com/dd27ce8f921787d863730c8a5dcfdf41/tumblr_mzz7quHGyw1spkkjwo1_500.gif',
    'https://38.media.tumblr.com/bd9b81926775c487f8f16f2b13200559/tumblr_mpolc5xTQm1rh8smko1_400.gif',
    'https://38.media.tumblr.com/a5d975ac3759f6ea6bf670c5e62529b3/tumblr_n51zp2MStM1ty5635o1_400.gif',
    'https://38.media.tumblr.com/8b91e88597acc56fd5978096b7aaf113/tumblr_n3olztMOda1rat0tqo1_400.gif',
    'https://33.media.tumblr.com/c7712f2a83a4c41f5126e0491e9f4d1c/tumblr_n6lqdnJYuG1s4fz4bo1_500.gif',
    'https://33.media.tumblr.com/b33caa83a49ba968e18e6d54b77ddf8d/tumblr_nw2m9fKsBH1qeqrhuo1_500.gif',
    'https://38.media.tumblr.com/2ef79b5b382765b175aa426b471eb640/tumblr_nvi4mwlKQz1tf7qzao1_540.gif',
    'https://38.media.tumblr.com/f7ef7e6fc713234987434ebed2c74716/tumblr_nwhbml1F4V1qfmbfwo1_1280.gif',
    'https://33.media.tumblr.com/195cdc5b21d3a8ba903980e3d989e5dd/tumblr_nvxgj1HwlU1txe8seo1_500.gif',
    'https://38.media.tumblr.com/709a75d0ab8d6aa3e341772c08646c31/tumblr_ng6qiglwnX1tchrkco1_500.gif',
    'https://38.media.tumblr.com/286a40e684ea64db3e579a6522086668/tumblr_nvs3z9Hozq1s2hovgo1_400.gif',
    'https://38.media.tumblr.com/c2b7ac932e79487efce827463079f737/tumblr_nvrxp5Yyof1uzkt7qo1_500.gif',
    'https://38.media.tumblr.com/bc2b9e4bdd95cad26820c9d3f126209e/tumblr_nwdmatDscP1sl2jlho1_500.gif',
    'https://38.media.tumblr.com/fed1e3eed7991d6878f3424ba93e6157/tumblr_nonkg2oNBC1rgiw7to1_500.gif',
    'https://38.media.tumblr.com/d6335fc614b22f2d9c99c5aba79eec96/tumblr_npndraryC11sb5osho1_540.gif',
    'https://38.media.tumblr.com/01b000f0cf0c4a0cd74f4912860fe331/tumblr_nk0js6ZlOv1r6zgh0o1_500.gif'
  ]

  // scope variables
  $scope.gif = null
  $scope.url = null
  $scope.finalUrl = null
  $scope.showInfo = false
  $scope.renderMode = 'rendered-sheet'
  $scope.palette = null
  $scope.Math = Math

  $scope.luckyButtonHandler = function() {
    var randomGifUrl = _.sample(self.RANDOM_GIF_URLS)
    self.loadGif(randomGifUrl)
  }

  $scope.statsButtonHandler = function() {
    $scope.renderMode = $scope.renderMode === 'rendered-sheet' ? 'seperate-images' : 'rendered-sheet'
    $scope.showInfo = !$scope.showInfo
  }

  $scope.getDisposalDescription = function(methodIdentifier) {
    if (methodIdentifier === 1)
      return 'Do not dispose. The graphic is to be left in place.'

    if (methodIdentifier === 2)
      return 'Restore to background color. The area used by the graphic must be restored to the background color.'

    if (methodIdentifier === 3)
      return 'Restore to previous. The decoder is required to restore the area overwritten by the graphic with what was there prior to rendering the graphic.'

    if (methodIdentifier > 3)
      return 'To be defined.'

    // fallback
    return 'No disposal specified.'
  }

  self.loadGif = function(url) {
    $scope.gif = null
    $scope.url = url
    $scope.finalUrl = null

    $http
      .post(SERVER_URL + '/request-gif', { url: url })
      .then(function(result) {
        console.log(result)
        $scope.finalUrl = result.data.file

        // load the gif and explode it in seperate frames
        var exploder = new Exploder($scope.finalUrl)
        exploder.load().then((gif) => {
          $timeout(function() {
            $scope.gif = gif
            console.log($scope.gif)

            var image = new Image()
            image.onload = function() {
              console.log('loaded')
              $timeout(function() {
                var vibrant = new Vibrant(image, 64, 5)
                $scope.swatches = vibrant.swatches()
              })
            }
            image.src = _.first($scope.gif.frames).url
          })
        })
      }, function() {
        console.log('error')
      })
  }
} ])

gifSheetApp.controller('GifSheetController', [ '$timeout', '$scope', function($timeout, $scope) {
  var self = this

  // variables
  self.images = null
  self.canvas = null
  self.cols = 0

  // scope variables
  $scope.sheetWidth = 0
  $scope.sheetHeight = 0

  self.init = function(element) {

    // element
    self.$element = element

    // extract the paths from the frames
    var paths = _.pluck($scope.gif.frames, 'url')

    // set cols/rows
    // try to check if we can layout the sheet in our preferred col count
    // if the modulus returns 0 this means the gif can be display in this exact col count
    var preferredCols = [ 3, 4, 5, 7, 2, 1 ]
    self.cols = _.find(preferredCols, function(col) {
      return !(paths.length % col)
    })

    console.log('Preferred cols: ' + self.cols)

    // preload images
    self.preload(paths).then(function(images) {
      self.images = images
      self.layout()
    })
  }

  // preload all image paths and return a promise
  self.preload = function(paths) {
    return new Promise(function(resolve, reject) {

      // reset preloaded count
      var preloaded = 0

      // create images and start preloading
      var images = _.map(paths, function(path) {
        var image = new Image()
        image.onload = function() {
          preloaded++
          if (preloaded === paths.length)
            resolve(images)
        }
        image.src = path
        return image
      })
    })
  }

  // layout the images onto the canvas
  self.layout = function() {

    // get the first image to read the dimensions
    // and set the sheet width/height
    var image = _.first(self.images)
    var sheetWidth = image.width * self.cols
    var sheetHeight = Math.ceil(self.images.length / self.cols) * image.height

    console.log('Sheet resolution: ' + sheetWidth + ' x ' + sheetHeight)

    var canvas = document.createElement('canvas')
    canvas.width = sheetWidth
    canvas.height = sheetHeight
    var context = canvas.getContext('2d')

    console.log(canvas)
    console.log(context)

    var previousFrameImageData = null
    _.each(self.images, function(image, index) {
      console.log('Drawing image: ' + index + ' - blob: ' + image.src)

      // current frame position on the canvas
      var x = (index % self.cols) * image.width
      var y = Math.floor(index / self.cols) * image.height

      console.log('\t at position: ' + x + ' x ' + y)

      // if we have a previous frame, draw that first
      // so that our current frame can draw over it
      if (previousFrameImageData)
        context.putImageData(previousFrameImageData, x, y)

      // then, draw the current frame
      context.drawImage(image, x, y)

      // copy the merged pixels for next frame
      // todo: only copy when we don't have to dispose!
      //    for now we >always< copy it over, this might result in unwanted merging
      previousFrameImageData = context.getImageData(x, y, image.width, image.height)
    })

    var canvasImage = new Image()
    canvasImage.src = canvas.toDataURL()
    self.$element.append(canvasImage)
  }
} ]).directive('gifSheet', function() {
  return {
    restrict: 'A',
    replace: false,
    scope: {
      gif: '=gifSheet',
      maxCols: '@maxCols'
    },
    controller: 'GifSheetController',
    template: '<div></div>',
    link: function(scope, element, attrs, controller) {
      controller.init(element)
    }
  }
})

angular.element(document).ready(function() {
  angular.bootstrap(document, [ 'gifSheetApp' ])
})
