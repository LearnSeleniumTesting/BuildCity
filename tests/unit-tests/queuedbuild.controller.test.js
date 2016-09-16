describe('queuedBuildCtrl', function(){
  var controller

  describe('#dologin', function(){
  it('should call url service', function(){
  expect(queuedBuildMock.login).toHaveBeenCalledWith();
  })
  })
});
