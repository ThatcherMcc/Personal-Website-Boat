"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { WeatherCondition } from "rt/app/boat-adventure/utils/weather-utils";

const SOUND_PREF_KEY = "boat-sound-enabled";

interface AmbientNodes {
  source: AudioBufferSourceNode;
  gainNode: GainNode;
  lfoSource?: OscillatorNode;
}

interface WeatherSoundConfig {
  gain: number;
  filterType: BiquadFilterType;
  filterFreq: number;
  filterQ: number;
  lfoFreq?: number;
  lfoGain?: number;
}

const WEATHER_SOUND_CONFIGS: Partial<Record<WeatherCondition, WeatherSoundConfig>> = {
  sunny: {
    gain: 0.035,
    filterType: "highpass",
    filterFreq: 1000,
    filterQ: 0.5,
  },
  cloudy: {
    gain: 0.055,
    filterType: "bandpass",
    filterFreq: 600,
    filterQ: 0.5,
    lfoFreq: 0.18,
    lfoGain: 200,
  },
  rainy: {
    gain: 0.12,
    filterType: "bandpass",
    filterFreq: 2200,
    filterQ: 0.25,
    lfoFreq: 8,
    lfoGain: 800,
  },
  stormy: {
    gain: 0.18,
    filterType: "lowpass",
    filterFreq: 400,
    filterQ: 1.2,
    lfoFreq: 0.4,
    lfoGain: 150,
  },
};

function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function startAmbientSound(
  ctx: AudioContext,
  condition: WeatherCondition,
  noiseBuffer: AudioBuffer
): AmbientNodes | null {
  const config = WEATHER_SOUND_CONFIGS[condition];
  if (!config) return null;

  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = config.filterType;
  filter.frequency.value = config.filterFreq;
  filter.Q.value = config.filterQ;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(config.gain, ctx.currentTime + 1.5);

  source.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(ctx.destination);
  source.start();

  let lfoSource: OscillatorNode | undefined;
  if (config.lfoFreq && config.lfoGain) {
    const lfo = ctx.createOscillator();
    lfo.frequency.value = config.lfoFreq;
    const lfoGainNode = ctx.createGain();
    lfoGainNode.gain.value = config.lfoGain;
    lfo.connect(lfoGainNode);
    lfoGainNode.connect(filter.frequency);
    lfo.start();
    lfoSource = lfo;
  }

  return { source, gainNode, lfoSource };
}

function stopAmbientSound(ctx: AudioContext, nodes: AmbientNodes) {
  const stopTime = ctx.currentTime + 0.9;
  nodes.gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
  setTimeout(() => {
    try {
      nodes.source.stop();
      nodes.lfoSource?.stop();
    } catch {
      // Already stopped
    }
  }, stopTime * 1000);
}

function playClickSound(ctx: AudioContext) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 660;
  gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.13);
}

export default function SoundManager() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState<WeatherCondition>("sunny");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseBufferRef = useRef<AudioBuffer | null>(null);

  // Load persisted preference
  useEffect(() => {
    const stored = localStorage.getItem(SOUND_PREF_KEY);
    if (stored === "true") setSoundEnabled(true);
  }, []);

  // Listen for weather condition changes
  useEffect(() => {
    const handleWeatherCondition = (event: CustomEvent<WeatherCondition>) => {
      setWeatherCondition(event.detail);
    };
    window.addEventListener(
      "weatherConditionChanged",
      handleWeatherCondition as EventListener
    );
    return () =>
      window.removeEventListener(
        "weatherConditionChanged",
        handleWeatherCondition as EventListener
      );
  }, []);

  // Play click sound on boat/room interactions
  useEffect(() => {
    const handleClick = () => {
      if (audioCtxRef.current) {
        playClickSound(audioCtxRef.current);
      }
    };
    if (!soundEnabled) return;
    window.addEventListener("boatClick", handleClick);
    window.addEventListener("roomClick", handleClick);
    return () => {
      window.removeEventListener("boatClick", handleClick);
      window.removeEventListener("roomClick", handleClick);
    };
  }, [soundEnabled]);

  // Manage ambient weather sound
  useEffect(() => {
    if (!soundEnabled) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    const ctx = audioCtxRef.current;

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    if (!noiseBufferRef.current) {
      noiseBufferRef.current = createNoiseBuffer(ctx);
    }

    const nodes = startAmbientSound(ctx, weatherCondition, noiseBufferRef.current);

    return () => {
      if (nodes && ctx) {
        stopAmbientSound(ctx, nodes);
      }
    };
  }, [soundEnabled, weatherCondition]);

  const toggle = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(SOUND_PREF_KEY, String(next));
      return next;
    });
  }, []);

  return (
    <button
      onClick={toggle}
      className="fixed bottom-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}
      title={soundEnabled ? "Mute sounds" : "Enable sounds"}
    >
      {soundEnabled ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </svg>
      )}
    </button>
  );
}
