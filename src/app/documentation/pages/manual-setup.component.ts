import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manual-setup',
  templateUrl: './manual-setup.component.html',
  styleUrls: ['../documentation.component.scss']
})
export class ManualSetupComponent implements OnInit {
  data: any = [];
  constructor() { }

  ngOnInit() {

  	  	this.data = [
  					`#-------------------------------------------------------
# Script to check if all is good before install script runs
#-------------------------------------------------------
echo "====== Dride install script ======"
echo ""
echo ""
echo ""
echo "██████╗ ██████╗ ██╗██████╗ ███████╗"
echo "██╔══██╗██╔══██╗██║██╔══██╗██╔════╝"
echo "██║  ██║██████╔╝██║██║  ██║█████╗  "
echo "██║  ██║██╔══██╗██║██║  ██║██╔══╝  "
echo "██████╔╝██║  ██║██║██████╔╝███████╗"
echo "╚═════╝ ╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝"
echo ""
echo ""
echo "This will install all the necessary dependences and software for dride."
echo "======================================================="
echo ""
echo ""



echo ""
echo ""
echo "==============================="
echo "*******************************"
echo " *** STARTING INSTALLATION ***"
echo "  ** this may take a while **"
echo "   *************************"
echo "   ========================="
echo ""
echo ""



cd /home

# Install dependencies
echo "========== Update Aptitude ==========="
# sudo apt-get update -y
# sudo apt-get upgrade


echo "========== Installing build-essential ============"
sudo apt-get install build-essential -y


echo "========== Installing libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev libjasper-dev python2.7-dev ============"
sudo apt-get install cmake git libgtk2.0-dev pkg-config libavcodec-dev libavformat-dev libswscale-dev libjasper-dev python2.7-dev -y


echo "========== Installing gpac ============"
sudo apt-get install gpac -y


# Install Node
echo "========== Installing Node ============"
sudo wget http://node-arm.herokuapp.com/node_latest_armhf.deb 
sudo dpkg -i node_latest_armhf.deb

sudo rm /home/node_latest_armhf.deb



echo "========== Installing pip ============"
sudo apt-get install python-pip -y

echo "========== Installing Numpy ============"
sudo pip install numpy


echo "========== Install picamera  ============"
sudo pip install "picamera[array]==1.12"


# enable camera on raspi-config and allocate more ram to the GPU
echo "" >> /boot/config.txt
echo "#enable piCaera" >> /boot/config.txt
echo "start_x=1" >> /boot/config.txt
echo "gpu_mem=128" >> /boot/config.txt



echo "========== Install mpg123  ============"
sudo apt-get install mpg123 -y


# Install WIFi
echo iptables-persistent iptables-persistent/autosave_v4 boolean true | sudo debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | sudo debconf-set-selections

sudo apt-get install hostapd isc-dhcp-server -y
sudo apt-get install iptables-persistent -y

cd /home 
# get the dhcpd config file
sudo wget https://dride.io/code/dhcpd.conf

sudo cp dhcpd.conf /etc/dhcp/dhcpd.conf
sudo rm dhcpd.conf


sudo bash -c 'echo "INTERFACES=\"wlan0\""> /etc/default/isc-dhcp-server'

sudo ifdown wlan0


sudo wget https://dride.io/code/interfaces

sudo cp interfaces /etc/network/interfaces
sudo rm interfaces


sudo ifconfig wlan0 192.168.42.1


sudo wget https://dride.io/code/hostapd.conf

sudo cp hostapd.conf /etc/hostapd/hostapd.conf
sudo rm hostapd.conf

sudo bash -c 'echo "DAEMON_CONF=\"/etc/hostapd/hostapd.conf\""> /etc/default/hostapd'

sudo wget https://dride.io/code/hostapd

sudo cp hostapd /etc/init.d/hostapd
sudo rm hostapd


sudo bash -c 'echo "net.ipv4.ip_forward=1"> /etc/sysctl.conf'
sudo sh -c "echo 1 > /proc/sys/net/ipv4/ip_forward"

sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
sudo iptables -A FORWARD -i eth0 -o wlan0 -m state --state RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i wlan0 -o eth0 -j ACCEPT


sudo sh -c "iptables-save > /etc/iptables/rules.v4"

sudo mv /usr/share/dbus-1/system-services/fi.epitest.hostap.WPASupplicant.service ~/


sudo service hostapd start 
sudo service isc-dhcp-server start
sudo update-rc.d hostapd enable 
sudo update-rc.d isc-dhcp-server enable




sudo pip install pyserial


#startup script's
sudo wget https://dride.io/code/startup/dride-ws


sudo wget https://dride.io/code/startup/dride-core
sudo wget https://dride.io/code/startup/drideOS-resize



# express on startup
sudo cp dride-ws /etc/init.d/dride-ws
sudo chmod +x /etc/init.d/dride-ws
sudo update-rc.d dride-ws defaults
sudo rm dride-ws

# dride-core on startup
sudo cp dride-core /etc/init.d/dride-core


sudo chmod +x /etc/init.d/dride-core
sudo update-rc.d dride-core defaults
sudo rm dride-core

# drideOS-resize on startup

sudo cp drideOS-resize /etc/init.d/drideOS-resize
sudo chmod +x /etc/init.d/drideOS-resize
sudo update-rc.d drideOS-resize defaults
sudo rm drideOS-resize






## GPS  https://www.raspberrypi.org/forums/viewtopic.php?p=947968#p947968
echo "========== Install GPS  ============"
sudo apt-get install gpsd gpsd-clients cmake subversion build-essential espeak freeglut3-dev imagemagick libdbus-1-dev libdbus-glib-1-dev libdevil-dev libfontconfig1-dev libfreetype6-dev libfribidi-dev libgarmin-dev libglc-dev libgps-dev libgtk2.0-dev libimlib2-dev libpq-dev libqt4-dev libqtwebkit-dev librsvg2-bin libsdl-image1.2-dev libspeechd-dev libxml2-dev ttf-liberation -y


echo "" >> /boot/config.txt
echo "core_freq=250" >> /boot/config.txt
echo "enable_uart=1" >> /boot/config.txt

# this will be done after initial boot
# echo "dwc_otg.lpm_enable=0  console=tty1 root=/dev/mmcblk0p2 rootfstype=ext4  elevator=deadline fsck.repair=yes   rootwait" > /boot/cmdline.txt



# 3)Run
sudo systemctl stop serial-getty@ttyS0.service
sudo systemctl disable serial-getty@ttyS0.service
sudo systemctl stop gpsd.socket
sudo systemctl disable gpsd.socket

# reboot

# 5) Execute the daemon reset
#sudo killall gpsd
#sudo gpsd /dev/ttyS0 -F /var/run/gpsd.sock







echo "========== Downloading and installing OpenCV ============"
cd /
# git clone https://github.com/Itseez/opencv.git --depth 1
wget -c -O "opencv-3.1.0.zip" "https://github.com/Itseez/opencv/archive/3.1.0.zip"
sudo apt-get install unzip
unzip -q -n "opencv-3.1.0.zip"

cd opencv-3.1.0
echo "==>>>====== Building OpenCV ============"
cd /home/opencv-3.1.0
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE -D BUILD_EXAMPLES=OFF -D BUILD_opencv_apps=OFF -D BUILD_DOCS=OFF -D BUILD_PERF_TESTS=OFF -D BUILD_TESTS=OFF -D CMAKE_INSTALL_PREFIX=/usr/local ..
echo "==>>>====== This might take a long time.. ============"
make -j1

sudo make install
sudo ldconfig

# remove the installation file
cd /
sudo rm opencv-3.1.0.zip

# TODO: Add a test if openCV was installed correctly


echo "========== Setup sound to I2S  ============"
sudo curl -sS https://dride.io/code/i2samp.sh  | bash


echo "========== Install Dride-core [Cardigan]  ============"
cd /home
# https://s3.amazonaws.com/dride/releases/cardigan/latest.zip
sudo mkdir Cardigan && cd Cardigan
sudo wget -c -O "cardigan.zip" "https://s3.amazonaws.com/dride/releases/cardigan/latest.zip"
sudo unzip "cardigan.zip"


sudo rm -R cardigan.zip


# make the video dir writable
sudo chmod 777 -R /home/Cardigan/modules/video/
sudo chmod 777 -R /home/Cardigan/settings/
#make gps position writable
sudo chmod +x /home/Cardigan/daemons/gps/position

# make the firmware dir writable
sudo chmod 777 -R /home/Cardigan/firmware/


# run npm install on dride-ws
cd /home/Cardigan/dride-ws

sudo npm i --production



echo "========== Setup bluetooth  ============"

sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev -y


# run npm install on Bluetooth daemon
cd /home/Cardigan/daemons/bluetooth
sudo npm i --production




echo ""
echo '============================='
echo '*****************************'
echo '========= Finished =========='
echo '*****************************'
echo '============================='
echo ""
`
  		]
  }

}
