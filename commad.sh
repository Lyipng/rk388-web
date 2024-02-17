cd /userdata &&
    sudo tftp -g -r app.zip -l app.zip 192.168.199.181

sudo tftp -g -r www.zip -l www.zip 192.168.199.181

scp -r ./www.zip root@192.168.199.105:/userdata

scp -r ./app.zip root@192.168.199.115:/userdata

sudo etc

# 目前有两个TX,一个接7G，另一个接笔记本电脑，以及4个Rx。
# 先是电脑画面的视频墙模式下正常显示，
# 将视频墙的tx源切换到7G就会出现异常，这时切换7G的分辨率就再次回到正常视频墙的状态。
# 主要是在两个TX的分辨率不同的情况下就会出现，在低分辨率切换到高分辨率时就会出现
# 在高分辨率切低分辨率时也会出现异常，直接黑屏，

# 视频墙模式下，切换不同分辨率的Tx，显示画面出现异常，改变该Tx端的分辨率就能回复正常。
