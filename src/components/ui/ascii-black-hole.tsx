"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiBlackHoleProps {
  className?: string;
  isHyperSpin?: boolean;
  onClick?: () => void;
}

// Master Braille Artwork supplied by the user (34 lines x 112 cols)
const BASE_ART_LINES: readonly string[] = [
  "⠰⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠈⡄⠀⠀⠀⡔⠂⠀⠈⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠂⠀⠀⠐⠈⠀⠀⠄⠀⠀⠠⠴⠤⣴⣆⠴⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠐⠀⠀⠀⠀⠀⠀⢑⠖⢀⡀⠀⠀⠀⠀⠀⠉⠑⠋⠁⠲⢶⣶⠂⠰⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠦⣀⢀⣁⣀⣤⡴⡿⣋⡴⣄⡠⠰⠖⡤⣄⣠⢀⡀⠀⡀⣠⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⡤⠄⠀⠀⠀⢀⠀⡀⠀⠀⠀⠈⠁⠀⠀⣀⣘⢀⣶⣶⢿⣛⠛⠋⠋⣉⠒⣂⠔⣭⢥⡙⠒⠀⡝⡷⢊⢋⠀⠌⡰⠓⣺⣻⡅⠀⡘⠉⠀⠄⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠦⠌⠃⠀⠀⣄⠀⠀⠘⣟⠀⡂⠀⠈⣠⡤⡶⠛⢫⠜⢋⠀⠂⠦⠑⢀⢠⢨⠖⣠⣩⠦⡹⢴⢚⣂⡄⢉⠩⠐⠀⠐⠠⢁⠀⠀⠀⠀⠠⠜⠀⠀⣀⣰⠤⣐⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⢀⡀⠁⣰⡀⠉⢿⠆⢀⣀⡠⣿⠝⣲⢛⠴⡲⣿⣷⣽⣼⡴⢦⣦⣤⣶⡴⣭⢏⡭⣐⢬⠰⢣⠬⣍⢣⠽⣙⣈⠀⠀⠄⠀⠀⢠⠀⠤⠁⠀⠀⡀⠀⠈⠘⠠⠀⢀⡀⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠐⠦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⢀⣂⡨⠅⡤⡘⠄⠋⢐⠈⡐⣿⣿⣆⢠⠣⠌⣹⠶⢧⣻⢿⣿⠿⠬⡽⣿⣟⢿⣿⣯⣞⣶⣜⣀⡑⡫⢶⠌⠣⠎⠱⡌⢆⢃⠆⠁⠠⢃⡈⠠⢀⠈⠒⠠⠄⠒⠀⠀⠀⠀⠀⠀⠉⠒⠉⠐⢍⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣶⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠈⠁⠀⠀⢘⡘⠖⢾⣤⣼⡳⠈⠁⠀⢘⠻⢿⣷⠋⡐⠃⠀⣨⣅⢌⡓⣦⣩⢍⣶⣬⣽⣴⣿⣿⠿⢯⢷⢂⣁⡉⠐⠢⣒⣄⠘⠔⠪⢌⡘⠐⢢⠀⠄⢃⠢⠘⡀⠂⠄⠂⠄⠀⠀⠠⠀⠀⠀⠀⠀⠈⠀⠂⠁⠐⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣄⡀⠀⠀⠀⡄⢐⡐⢆⣔⡻⢿⣫⣌⠈⡁⠡⣹⣷⢨⡀⣶⣄⠀⣿⠿⡐⣷⣷⣿⣿⣿⡿⢛⣩⣶⣶⣿⣿⣿⣷⣶⣾⣽⣓⡢⠌⠁⠈⡀⢄⠈⢁⠂⠅⡊⠄⡁⠆⢡⢉⠠⠡⠌⡀⠒⡀⡀⠀⢀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠑⠂⠄⠀⢀⣐⠾⠇⣙⣦⠹⣿⣿⠇⡀⣴⣿⢻⠁⢥⠀⢛⣚⠀⣧⡙⣽⣿⣿⣟⡟⣼⣿⣿⣿⡿⣹⣿⣿⣿⣽⣿⣻⣿⣿⣶⣆⡠⠀⠉⠓⣤⡔⠄⡀⠐⠀⠀⠂⠤⢁⠂⡐⢀⠂⠄⠀⠀⠀⠈⠈⠛⠰⠤⠀⠀⠀⠐⠀⠀⣡⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠘⠌⢨⢴⣮⡛⣧⣍⠖⣽⣾⣿⣷⢉⡣⢈⡈⢘⠻⣠⠁⣧⢻⣿⣿⣻⣃⣿⣿⣿⣰⣿⡿⢟⣛⣛⣻⠻⣿⣿⣿⣽⣿⣿⣟⣦⣐⠶⢴⣻⡴⠆⡀⠧⢉⠆⠠⠁⠄⢂⠐⠈⠠⠀⠀⠂⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠁⡀⠣⠱⣙⣌⢿⡆⣙⠾⣶⡽⣷⡹⡆⡨⣌⠳⣽⣟⢬⡂⢻⣿⣿⣘⣿⣿⣧⣾⣿⣰⣿⣿⣿⣿⣿⣷⣶⣮⡻⣿⣿⣿⣿⣿⣶⣦⣬⢶⡌⣅⣐⠃⢂⠤⢁⠌⠠⠈⠀⠐⠀⡁⠄⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠐⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⡄⡀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠣⠩⣭⣎⡻⣿⣾⣄⢽⣿⣷⣁⠀⡨⣝⠞⣿⡟⢻⣿⣿⣿⣿⡘⣿⣿⣿⢱⣿⣿⣿⣿⣭⣽⣻⢿⣿⣿⣶⣉⢻⣿⣛⢿⣿⣿⣷⣦⣬⡉⢙⠲⡀⠁⠠⠀⠀⠀⠀⠀⠄⠀⠂⢀⠠⠀⠀⠀⠁⠀⠠⠄⡀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠁⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠈⠳⠤⢽⣻⣮⢿⣻⢦⡑⢾⣿⣦⠙⠲⣶⣽⣿⣏⣿⣿⣾⣿⣿⡘⣿⣿⣜⣿⣿⠛⠛⠛⠛⠿⣷⣟⢻⣿⣿⣿⣾⣝⣻⣿⣻⣿⣿⣿⣟⢦⣉⠘⠝⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡄⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠂⡈⠀⠀⠓⠒⠒⢿⣯⠭⡳⠍⠀⠘⢻⣗⡂⠛⢿⣿⣿⡿⣿⣿⠾⣿⣿⣶⡙⣿⣿⡟⠀⠀⠀⠀⠀⠀⠈⠹⣿⣿⣿⣿⣿⣿⣷⣶⡹⢿⣿⣿⣷⣜⠷⣀⠙⢷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠰⠀⢉⠈⡾⣀⣈⠹⢷⣆⠈⠀⢿⣿⣿⡀⠀⡉⢏⣿⣎⢿⣿⣶⣛⣿⣿⣶⣬⣝⡢⠀⠀⠀⠀⠀⠀⠀⠸⣿⣷⣦⣙⢿⣿⣟⣿⣿⣽⢻⣿⣿⣷⠉⣷⡀⠆⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠒⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠂⠨⠙⠶⡩⣕⠦⢄⠰⣎⠀⠀⡉⠛⢿⣷⡄⢴⣌⣻⣷⣝⠿⣿⣶⣽⢻⣿⣿⣿⣷⣦⣄⣀⠀⠀⠀⣸⣿⣿⣿⣿⡜⢿⣿⣿⣿⣿⡹⣿⣿⣿⣷⡄⠐⣄⠙⠆⣢⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠴⠀⠀⠀⠀⠀⠂⠁⠀⠂⢀⠀⠄⠘⠲⢷⣇⠓⠠⢂⠻⡔⠦⠀⠙⢿⣷⣠⣙⠿⣿⣿⣿⣛⢿⢿⣿⣿⣾⣿⣾⣿⣿⣿⠿⣿⣿⣿⣿⣿⣿⣷⢹⣿⣿⣿⣿⣖⣿⣿⣻⣿⣧⠛⠤⠡⡈⠻⣿⣷⠀⠀⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⡀⠀⠂⠀⡀⠀⠀⠀⠀⠀⠀⠂⠄⠠⠀⠹⡟⢞⢮⡀⢁⡀⢛⡰⢌⠋⠽⣿⣷⣝⣿⣿⣿⣿⣷⣶⣭⣙⣛⣛⣛⣫⣶⣾⣿⣿⣿⡇⣿⣿⣽⣷⢹⣿⡿⣿⡟⢻⣿⣿⣿⣿⠟⣨⠇⠁⠀⠈⢹⣷⣀⠀⠀⠀⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⢨⣁⠀⡀⠀⠁⠀⠀⠀⠀⠁⡀⠘⠂⠄⠽⠢⣒⣣⢉⢎⡂⠑⣀⡐⢿⠳⣾⣭⣛⣿⠿⣿⣿⣿⣿⣿⣿⣿⡿⢛⣛⣭⣾⣿⣿⣻⣿⢺⣿⡧⣿⣿⡾⣿⣾⣿⣿⣧⡹⡅⢓⠀⡀⠈⠿⢿⣆⡀⠀⠀⠤⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠤⠀⡉⠂⣀⠀⠠⠀⠠⠀⠀⠀⠀⠀⠈⠠⡁⠔⢚⠩⠂⢀⠆⡁⠦⡙⠆⢢⣙⠷⣿⣿⣿⣶⣝⡻⢿⣷⣿⣾⣿⣿⣿⣿⣿⣿⣿⣿⡿⣸⣿⡧⣿⣿⣧⣿⣿⣼⣿⣝⣅⡈⠦⠁⠀⠐⠩⣌⣿⣷⠀⠀⠄⠁⡈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠃⠠⡄⢀⠀⠀⠀⠀⠀⠡⡐⠂⠈⠐⡈⠄⠂⡉⢖⡩⢓⡢⡑⢦⠈⠹⣿⣿⣛⣿⣷⣴⣬⣭⣭⣙⣛⣛⣛⣛⣹⣭⣴⣾⣿⢏⣾⣿⣿⣽⣿⣿⣿⡆⢍⢧⠳⣈⠐⠀⠀⠘⣿⡻⢵⡐⡤⠒⠀⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠙⠈⠀⠄⠀⠀⡀⠐⠀⠄⠀⠁⠀⠐⠂⠬⢐⡓⣂⣃⠐⢢⠄⣢⢉⠒⠾⠿⢽⣭⣭⣿⣿⣿⣿⣿⣿⢿⣿⣟⣻⢟⣛⣼⣿⣿⣿⢿⣿⣿⡋⠝⡘⡇⠀⠹⠀⣐⢂⠀⠸⣯⠐⡟⢔⢦⡀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⣐⢢⡒⠀⠀⡀⠉⢐⡂⠀⡄⠈⠀⠀⠀⠀⠀⡁⡈⢀⠡⠀⠦⠍⢦⢚⡴⢏⢶⡲⠦⣉⡉⠩⠯⣝⣭⡮⠕⠻⡿⠿⠿⣿⣿⣿⣿⡻⢛⣵⡿⠍⢊⡼⠓⠁⠡⠀⠐⢠⠀⠈⠀⢴⣟⡳⠈⠀⠘⢺⣃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠈⠀⠀⠈⢚⠰⠄⠀⢀⠀⠀⠀⠀⠀⠐⠀⡈⠀⠈⡉⢊⡉⢏⡝⣂⡥⡍⡝⡺⡊⢈⣣⠾⣫⡘⢳⣌⣁⣬⡌⡩⠤⠐⣈⠬⢕⡾⠁⠀⠀⠃⠀⠈⠍⠐⡒⠀⠀⢹⣶⡅⢿⢢⠢⠠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠐⢶⠖⡂⡉⠤⣴⡏⠀⠀⡀⠀⠀⠀⡀⠀⠀⠈⡉⣓⡻⣷⢿⣬⣡⡶⡴⣒⣘⠒⢶⣾⣿⠌⠛⣩⣅⢁⡐⡛⠉⠞⠁⠀⢀⡀⡴⠄⠀⠈⠀⠒⢄⡙⢽⣿⣿⡣⣤⡔⢆⡀⠀⡠⠀⠀⠀⡈⠀⡀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠩⠉⠐⢫⡐⠿⣶⢓⣨⣄⢀⠡⡄⣂⠠⠠⡠⢹⠦⣒⢆⡶⣢⠍⡻⠓⡊⡠⠀⡡⠹⣄⠀⡀⢀⡄⠀⠂⠀⠂⠠⢀⡠⠐⠃⡠⢒⠀⠪⣜⣻⡟⠿⣿⡇⠑⡎⠐⠈⢁⠀⠀⠀⠀⠀⢐⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠈⠐⠙⣩⢏⣭⣶⢿⣦⡳⣔⣾⢏⣀⢚⡋⢀⠴⠖⣂⣅⢄⠎⣀⡠⣌⢉⠠⡤⣤⢀⢂⣄⢧⠐⢊⡁⡠⣤⣄⠂⠉⣀⣶⡇⢐⠬⡙⠂⠀⡐⡁⠀⠂⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠃⠉⠠⠁⠻⠣⢙⡃⢾⢿⣿⣿⣿⣿⡿⠟⠋⠩⠄⢤⠂⠩⠘⠓⠈⠐⠁⠘⢏⠁⠀⠀⢠⠐⠦⣩⠴⠁⢾⠏⠌⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠈⠙⠀⠄⠀⠀⠀⠀⠄⠒⠫⠙⠃⠤⠠⠄⠁⠠⠁⠀⠀⠜⠈⠀⠈⠈⠻⠉⠀⠀⠘⠀⠠⠀⠀⠠⠈⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠆⠀⠀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠲⠀⠂⠀⠁⠀⠀⠀⠀⠀⠀⠀⠐⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠃⠀⠀⠀⠀⠀"
];

// Coordinate centers of accretion disks and event horizon
const CENTER_Y = 18.5;
const CENTER_X = 54.8;
const ASPECT = 2.0;

export function AsciiBlackHole({
  className = "",
  isHyperSpin = false,
  onClick,
}: AsciiBlackHoleProps) {
  const [frame, setFrame] = useState<string>(() => BASE_ART_LINES.join("\n"));
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const rows = BASE_ART_LINES.length;
    const cols = BASE_ART_LINES[0].length;

    // Decode original art to numerical Braille mask buffer
    const baseMasks = new Uint8Array(rows * cols);
    for (let r = 0; r < rows; r++) {
      const line = BASE_ART_LINES[r];
      for (let c = 0; c < cols; c++) {
        const ch = line[c] || "⠀";
        const code = ch.charCodeAt(0);
        baseMasks[r * cols + c] = (code >= 0x2800 && code <= 0x28ff) ? (code - 0x2800) : 0;
      }
    }

    let t = 0;
    let animId: number;
    let lastTime = 0;
    const FPS = isHyperSpin ? 40 : 20;
    const interval = 1000 / FPS;

    const render = (currentTime: number) => {
      animId = requestAnimationFrame(render);

      if (!isVisibleRef.current) return;

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      t += isHyperSpin ? 0.2 : 0.05;

      let output = "";

      for (let r = 0; r < rows; r++) {
        let line = "";
        const dy = (r - CENTER_Y) * ASPECT;

        for (let c = 0; c < cols; c++) {
          const origMask = baseMasks[r * cols + c];

          if (origMask === 0) {
            line += "⠀";
            continue;
          }

          const dx = c - CENTER_X;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          // Preserve the deep dark Event Horizon void
          if (dist < 5.5) {
            line += String.fromCharCode(0x2800 + origMask);
            continue;
          }

          // Keplerian orbital flow: inner gas orbits faster than outer streams
          const orbitalSpeed = 4.2 / (Math.sqrt(dist) + 0.5);
          const phase = angle - t * orbitalSpeed;

          // Multi-harmonic turbulence waves along the accretion disk
          const wave1 = Math.sin(phase * 4 + dist * 0.45);
          const wave2 = Math.cos(phase * 2 - t * 0.8 + dist * 0.25);
          const shimmer = wave1 * 0.5 + wave2 * 0.5;

          let animatedMask = origMask;

          // Modulate individual dot densities dynamically
          if (shimmer > 0.45) {
            // Particle accretion compression: energize sub-dots
            const flowShift = Math.floor((phase * 2) % 4);
            if (flowShift === 0) animatedMask |= 0x01 | 0x08;
            else if (flowShift === 1) animatedMask |= 0x02 | 0x10;
            else if (flowShift === 2) animatedMask |= 0x04 | 0x20;
            else animatedMask |= 0x40 | 0x80;
          } else if (shimmer < -0.55 && origMask > 0x10) {
            // Particle stream dispersion / rarefaction
            const clearBit = (Math.floor(dist + t * 3) % 4);
            if (clearBit === 0) animatedMask &= ~0x01;
            else if (clearBit === 1) animatedMask &= ~0x08;
            else if (clearBit === 2) animatedMask &= ~0x40;
            else animatedMask &= ~0x80;
          }

          // Subtle dot rotational flow around the event horizon ring
          if (dist >= 6.0 && dist <= 26.0) {
            const rotStep = (Math.floor((angle + t * 1.5 + dist * 0.1) * 3)) % 4;
            if (rotStep === 1 && (animatedMask & 0x03)) {
              animatedMask = (animatedMask & ~0x03) | ((animatedMask & 0x01) ? 0x02 : 0x01);
            }
          }

          line += String.fromCharCode(0x2800 + (animatedMask || origMask));
        }

        output += line + "\n";
      }

      setFrame(output.trimEnd());
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [isHyperSpin]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`select-none overflow-x-auto ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      <pre
        className="text-[var(--terminal-accent)] text-[4.2px] sm:text-[5px] md:text-[5.5px] leading-[1.0] tracking-[0.2px] font-mono font-normal whitespace-pre transition-all duration-300"
        style={{
          textShadow: isHyperSpin
            ? "0 0 25px rgba(239, 68, 68, 0.9), 0 0 50px rgba(239, 68, 68, 0.6)"
            : "0 0 10px rgba(34, 211, 167, 0.4)",
        }}
      >
        {frame}
      </pre>
    </div>
  );
}
