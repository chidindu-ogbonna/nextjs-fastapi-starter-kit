FROM docker.io/ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV DEBIAN_PRIORITY=high

# Install required packages
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install \
    xvfb \
    xterm \
    xdotool \
    scrot \
    imagemagick \
    sudo \
    mutter \
    x11vnc \
    tint2 \
    build-essential \
    python3 \
    python3-pip \
    && apt-get clean

# Setup user
ENV USERNAME=computeruse
ENV HOME=/home/$USERNAME
RUN useradd -m -s /bin/bash -d $HOME $USERNAME
RUN echo "${USERNAME} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
USER computeruse
WORKDIR $HOME

# Install Python dependencies
COPY --chown=$USERNAME:$USERNAME computer_use_demo/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip3 install uvicorn

# Copy application files
COPY --chown=$USERNAME:$USERNAME computer_use_demo/ computer_use_demo/
COPY --chown=$USERNAME:$USERNAME image/api-entrypoint.sh $HOME
# TODO: Delete L:40 if L:39 is working properly
# COPY --chown=$USERNAME:$USERNAME api-entrypoint.sh .
RUN chmod +x api-entrypoint.sh

# Set display variables
ARG DISPLAY_NUM=1
ARG HEIGHT=768
ARG WIDTH=1024
ENV DISPLAY_NUM=$DISPLAY_NUM
ENV HEIGHT=$HEIGHT
ENV WIDTH=$WIDTH
ENV DISPLAY=:${DISPLAY_NUM}

EXPOSE 8000

ENTRYPOINT [ "./api-entrypoint.sh" ]
