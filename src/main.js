import './style.css';
import { Game } from './game.js';
import { AudioEngine } from './audio.js';
import { createWeaponFromPhrase, describeWeapon } from './weapons.js';

/* ============================================================
   DOM
   ============================================================ */

const $ = (id) => document.getElementById(id);

const els = {
  canvas: $('game-canvas'),
  boot: $('boot'),
  menu: $('menu'),
  hud: $('hud'),
  startBtn: $('start-btn'),
  silentBtn: $('silent-btn'),
  tiltToggle: $('tilt-toggle'),
  soundToggle: $('sound-toggle'),
  pauseBtn: $('pause-btn'),
  micBtn: $('mic-btn'),
  typeBtn: $('type-btn'),
  fireBtn: $('fire-btn'),
  joystick: $('joystick'),
  joystickThumb: $('joystick-thumb'),
  healthFill: $('health-fill'),
  healthValue: $('health-value'),
  waveLabel: $('wave-label'),
  hostilesLabel: $('hostiles-label'),
  scoreValue: $('score-value'),
  comboValue: $('combo-value'),
  waveBanner: $('wave-banner'),
  waveBannerKicker: $('wave-banner-kicker'),
  waveBannerTitle: $('wave-banner-title'),
  waveBannerSub: $('wave-banner-sub'),
  weaponCard: $('weapon-card'),
  weaponRarity: $('weapon-rarity'),
  weaponKind: $('weapon-kind'),
  weaponName: $('weapon-name'),
  weaponElement: $('weapon-element'),
  weaponMode: $('weapon-mode'),
  statDamage: $('stat-damage'),
  statDamageNum: $('stat-damage-num'),
  statRate: $('stat-rate'),
  statRateNum: $('stat-rate-num'),
  harvestHud: $('harvest-hud'),
  harvestKicker: $('harvest-kicker'),
  harvestWords: $('harvest-words'),
  harvestPhrase: $('harvest-phrase'),
  harvestCount: $('harvest-count'),
  harvestTotal: $('harvest-total'),
  harvestFill: $('harvest-fill'),
  harvestHint: $('harvest-hint'),
  transcript: $('transcript'),
  transcriptText: $('transcript-text'),
  voiceHint: $('voice-hint'),
  hitmarker: $('hitmarker'),
  crosshair: $('crosshair'),
  killfeed: $('killfeed'),
  toast: $('toast'),
  damageFlash: $('damage-flash'),
  tiltBadge: $('tilt-badge'),
  desktopHint: $('desktop-hint'),
  menuBtn: $('menu-btn'),
  forgeStartBtn: $('forge-start-btn'),
  forgeEntryStatus: $('forge-entry-status'),
  menuWeaponStatus: $('menu-weapon-status'),
  forgeModal: $('forge-modal'),
  forgeCard: document.querySelector('.forge-card'),
  forgeForm: $('forge-form'),
  forgeInput: $('forge-input'),
  forgeDismiss: $('forge-dismiss'),
  forgeClose: $('forge-close'),
  forgePlay: $('forge-play'),
  forgeEquip: $('forge-equip'),
  forgeDictate: $('forge-dictate'),
  forgeDictateLabel: $('forge-dictate-label'),
  forgePermission: $('forge-permission'),
  forgePermissionLabel: $('forge-permission-label'),
  forgeVoiceStatus: $('forge-voice-status'),
  forgePreview: document.querySelector('.forge-preview'),
  forgePreviewRarity: $('forge-preview-rarity'),
  forgePreviewName: $('forge-preview-name'),
  forgePreviewKind: $('forge-preview-kind'),
  forgePreviewDesc: $('forge-preview-desc'),
  forgePreviewElement: $('forge-preview-element'),
  forgePreviewMode: $('forge-preview-mode'),
  forgeStatDamage: $('forge-stat-damage'),
  forgeStatDamageNum: $('forge-stat-damage-num'),
  forgeStatRate: $('forge-stat-rate'),
  forgeStatRateNum: $('forge-stat-rate-num'),
  forgePreviewNote: $('forge-preview-note'),
  forgeMemoryList: $('forge-memory-list'),
  forgeMemoryCount: $('forge-memory-count'),
  forgeMemoryEmpty: $('forge-memory-empty'),
  typeModal: $('type-modal'),
  typeForm: $('type-form'),
  typeInput: $('type-input'),
  typeClose: $('type-close'),
  micModal: $('mic-modal'),
  micMessage: $('mic-message'),
  micRetry: $('mic-retry'),
  micSkip: $('mic-skip'),
  pauseModal: $('pause-modal'),
  pauseScore: $('pause-score-value'),
  pauseWave: $('pause-wave-value'),
  resumeBtn: $('resume-btn'),
  calibrateBtn: $('calibrate-btn'),
  quitBtn: $('quit-btn'),
  gameoverModal: $('gameover-modal'),
  finalScore: $('final-score'),
  finalWave: $('final-wave'),
  finalKills: $('final-kills'),
  finalWeapon: $('final-weapon'),
  restartBtn: $('restart-btn'),
  rotateHint: $('rotate-hint'),
  voiceNote: $('voice-note'),
};

const audio = new AudioEngine();
const coarsePointer = matchMedia('(pointer: coarse)').matches;
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/* ============================================================
   Persistent preferences
   ============================================================ */

function readPref(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value === '1';
  } catch {
    return fallback;
  }
}

function writePref(key, value) {
  try {
    window.localStorage.setItem(key, value ? '1' : '0');
  } catch {
    /* Private mode can refuse storage; the session still works. */
  }
}

const WEAPON_MEMORY_KEY = 'vox_weapon_memory';
const MENU_WEAPON_KEY = 'vox_menu_weapon';
const DEFAULT_SHOWCASE_PHRASE = 'canhão de plasma ancestral';
const FALLBACK_WEAPON_PHRASE = 'pistola de acesso';

function readStringPref(key, fallback = '') {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function writeStringPref(key, value) {
  try {
    window.localStorage.setItem(key, String(value));
  } catch {
    /* Storage is optional; the forge still works for this session. */
  }
}

const state = {
  game: null,
  preferredVoice: readPref('vox_voice', true),
  voiceWanted: false,
  speechSupported: false,
  recognition: null,
  recognitionRunning: false,
  recognitionRestartTimer: null,
  recognitionErrorCount: 0,
  lastPhrase: '',
  lastPhraseAt: 0,
  transcriptResetTimer: null,
  toastTimer: null,
  harvestHideTimer: null,
  menuAnimationTimer: null,
  damageFlashTimer: null,
  scorePopTimer: null,
  forgePreviewTimer: null,
  menuWeapon: null,
  forgeDraft: null,
  forgeBaseWeapon: null,
  forgeOpen: false,
  forgeVoiceError: false,
  forgeRecognition: null,
  forgeRecognitionRunning: false,
  forgeMicPermission: 'unknown',
  weaponMemory: [],
  soundOn: readPref('vox_sound', true),
  tiltOn: readPref('vox_tilt', false),
  tiltActive: false,
  tiltRaw: null,
  tiltBaseline: null,
  tiltSmoothYaw: 0,
  tiltSmoothPitch: 0,
  tiltListenerAttached: false,
  keys: new Set(),
  spaceDown: false,
  fireDown: false,
  mouseFireDown: false,
  pointerLocked: false,
  lookPointerId: null,
  lookLastX: 0,
  lookLastY: 0,
  joystickPointerId: null,
  joystickX: 0,
  joystickY: 0,
  pausedForType: false,
  overTimer: null,
  gameStartedAt: 0,
  speechPulse: 0,
  lastHealthShown: 100,
  runToken: 0,
  autoStarted: false,
};

/* ============================================================
   UI helpers
   ============================================================ */

function showToast(message, kind = '') {
  if (!message) return;
  clearTimeout(state.toastTimer);
  els.toast.textContent = message;
  els.toast.classList.toggle('error', kind === 'error');
  els.toast.classList.add('show');
  state.toastTimer = setTimeout(() => els.toast.classList.remove('show'), 2900);
}

function showWaveBanner(kicker, title, subtitle) {
  els.waveBannerKicker.textContent = kicker;
  els.waveBannerTitle.textContent = title;
  els.waveBannerSub.textContent = subtitle;
  els.waveBanner.classList.remove('show');
  void els.waveBanner.offsetWidth;
  els.waveBanner.classList.add('show');
}

function updateTranscript(text, recording = false) {
  clearTimeout(state.transcriptResetTimer);
  els.transcriptText.textContent = text;
  els.transcript.classList.toggle('recording', recording);
}

function resetTranscript() {
  if (!state.voiceWanted) {
    updateTranscript('Microfone desligado. Toque no ícone para reativar.', false);
    return;
  }
  updateTranscript('Diga uma arma e colete os bloquinhos no mapa.', false);
}

function updateHarvestUi(harvest) {
  if (!harvest) {
    hideHarvestUi();
    return;
  }
  clearTimeout(state.harvestHideTimer);
  els.harvestHud.classList.remove('complete');
  els.harvestHud.classList.remove('is-hidden');
  els.harvestHud.style.setProperty('--harvest-accent', harvest.weapon?.accent || '#d7ff45');
  const wordCount = harvest.words.length;
  els.harvestWords.textContent = `${wordCount} ${wordCount === 1 ? 'PALAVRA' : 'PALAVRAS'} × 10`;
  els.harvestKicker.textContent = 'FORJA EM COLETA';
  els.harvestPhrase.textContent = harvest.weapon?.title || harvest.phrase;
  els.harvestTotal.textContent = String(harvest.total);
  els.harvestCount.textContent = String(harvest.collected);
  const percent = harvest.total > 0 ? (harvest.collected / harvest.total) * 100 : 0;
  els.harvestFill.style.width = `${percent}%`;
  els.harvestHint.textContent = 'Pise nos bloquinhos de cada palavra para juntar a arma.';
}

function hideHarvestUi() {
  clearTimeout(state.harvestHideTimer);
  els.harvestHud.classList.add('is-hidden');
  els.harvestHud.classList.remove('complete');
}

function formatNumber(value) {
  return String(Math.max(0, Math.round(value))).padStart(6, '0');
}

function updateMicUI(on) {
  els.micBtn.classList.toggle('is-live', on);
  els.micBtn.classList.toggle('is-off', !on);
  els.micBtn.setAttribute('aria-label', on ? 'Desligar microfone' : 'Ligar microfone');
  els.voiceHint.classList.toggle('off', !on);
  els.voiceHint.textContent = on
    ? 'MICROFONE ATIVO • FALE UMA ARMA'
    : 'MICROFONE DESLIGADO • TOQUE NO ORB';
}

function showModal(element) {
  element.classList.remove('is-hidden');
}

function hideModal(element) {
  element.classList.add('is-hidden');
}

function flashDamage() {
  clearTimeout(state.damageFlashTimer);
  els.damageFlash.classList.add('active');
  state.damageFlashTimer = setTimeout(() => els.damageFlash.classList.remove('active'), 100);
}

function pulseHaptic(duration = 12) {
  try {
    // Chrome logs a console error if vibration is requested before the first tap.
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
    navigator.vibrate?.(duration);
  } catch {
    /* Haptics are a bonus, never a requirement. */
  }
}

/* ============================================================
   Start-screen weapon designer
   ============================================================ */

function readWeaponMemory() {
  try {
    const raw = window.localStorage.getItem(WEAPON_MEMORY_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item.phrase === 'string' && item.phrase.trim())
      .slice(0, 6);
  } catch {
    return [];
  }
}

function writeWeaponMemory(list) {
  try {
    window.localStorage.setItem(WEAPON_MEMORY_KEY, JSON.stringify(list.slice(0, 6)));
  } catch {
    /* Storage can be unavailable in private mode. */
  }
}

function rememberWeapon(weapon) {
  if (!weapon?.phrase) return;
  const key = weapon.normalized || weapon.phrase.trim().toLowerCase();
  const previous = state.weaponMemory.find((item) => {
    const itemKey = item.normalized || String(item.phrase || '').trim().toLowerCase();
    return itemKey === key;
  });
  state.weaponMemory = [
    {
      phrase: weapon.phrase,
      normalized: key,
      kind: weapon.kind,
      accent: weapon.accent,
      createdAt: previous?.createdAt || Date.now(),
    },
    ...state.weaponMemory.filter((item) => {
      const itemKey = item.normalized || String(item.phrase || '').trim().toLowerCase();
      return itemKey !== key;
    }),
  ].slice(0, 6);
  writeWeaponMemory(state.weaponMemory);
  renderWeaponMemory();
}

function renderWeaponMemory() {
  if (!els.forgeMemoryList) return;
  els.forgeMemoryCount.textContent = String(state.weaponMemory.length);
  els.forgeMemoryEmpty.classList.toggle('is-hidden', state.weaponMemory.length > 0);
  els.forgeMemoryList.replaceChildren();

  for (const item of state.weaponMemory) {
    const weapon = createWeaponFromPhrase(item.phrase);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'forge-memory-item';
    button.style.setProperty('--item-accent', weapon.accent);

    const title = document.createElement('b');
    title.textContent = weapon.title;
    const subtitle = document.createElement('small');
    subtitle.textContent = `${weapon.kind} • ${weapon.rarity.label}`;
    const element = document.createElement('em');
    element.textContent = weapon.element.label;

    button.append(title, subtitle, element);
    button.addEventListener('click', () => {
      els.forgeInput.value = weapon.title;
      updateForgeDraft(weapon.title);
      if (!coarsePointer) els.forgeInput.focus({ preventScroll: true });
    });
    els.forgeMemoryList.appendChild(button);
  }
}

function updateMenuWeaponStatus() {
  if (!els.menuWeaponStatus || !els.forgeEntryStatus) return;
  if (state.menuWeapon) {
    const weapon = state.menuWeapon;
    els.menuWeaponStatus.innerHTML = 'ARMA EQUIPADA <span>//</span> <b></b>';
    els.menuWeaponStatus.querySelector('b').textContent = weapon.title;
    els.forgeEntryStatus.textContent = `${weapon.kind} • ${weapon.rarity.label} • toque para editar`;
    return;
  }
  els.menuWeaponStatus.innerHTML = 'ARMA PADRÃO <span>//</span> <b>PISTOLA DE ACESSO</b>';
  els.forgeEntryStatus.textContent = 'escreva ou fale o nome • prévia 3D • equipe antes de jogar';
}

function setMenuWeapon(weapon, { remember = false, syncInput = false } = {}) {
  if (!weapon) return;
  state.menuWeapon = weapon;
  writeStringPref(MENU_WEAPON_KEY, weapon.title);
  document.documentElement.style.setProperty('--weapon-accent', weapon.accent);
  document.documentElement.style.setProperty('--weapon-accent-rgb', weapon.accentRgb);
  if (state.game?.mode === 'menu') state.game.previewWeapon(weapon);
  updateMenuWeaponStatus();
  if (syncInput) els.forgeInput.value = weapon.title;
  if (remember) rememberWeapon(weapon);
}

function renderForgePreview(weapon) {
  if (!weapon) return;
  els.forgePreview.style.setProperty('--forge-accent', weapon.accent);
  els.forgePreview.style.setProperty('--forge-accent-rgb', weapon.accentRgb);
  els.forgePreviewRarity.textContent = weapon.rarity.label;
  els.forgePreviewRarity.style.color = weapon.rarity.color;
  els.forgePreviewName.textContent = weapon.name;
  els.forgePreviewKind.textContent = weapon.kind;
  els.forgePreviewDesc.textContent = describeWeapon(weapon);
  els.forgePreviewElement.textContent = weapon.element.label;
  els.forgePreviewMode.textContent = weapon.mode;
  els.forgeStatDamage.style.width = `${weapon.bars.damage}%`;
  els.forgeStatRate.style.width = `${weapon.bars.rate}%`;
  els.forgeStatDamageNum.textContent = String(weapon.stats.displayedDamage);
  els.forgeStatRateNum.textContent = String(weapon.stats.rate);
  const pellets = weapon.stats.pellets > 1
    ? `${weapon.stats.pellets} projéteis por disparo`
    : 'projétil único';
  els.forgePreviewNote.textContent = `${pellets} • alcance ${Math.round(weapon.stats.range)} m • ${weapon.rarity.label.toLowerCase()} • a prévia também gira no showroom 3D.`;
}

function updateForgeDraft(phrase) {
  const clean = String(phrase || '').replace(/\s+/g, ' ').trim();
  if (!clean) {
    state.forgeDraft = null;
    if (state.game?.mode === 'menu' && state.forgeBaseWeapon) {
      state.game.previewWeapon(state.forgeBaseWeapon);
    }
    els.forgePreviewNote.textContent = 'Digite um nome ou toque em DITAR para começar a forja.';
    return null;
  }

  const weapon = createWeaponFromPhrase(clean);
  state.forgeDraft = weapon;
  renderForgePreview(weapon);
  if (state.game?.mode === 'menu') state.game.previewWeapon(weapon);
  return weapon;
}

function scheduleForgeDraft() {
  clearTimeout(state.forgePreviewTimer);
  state.forgePreviewTimer = setTimeout(() => {
    updateForgeDraft(els.forgeInput.value);
  }, 110);
}

function getForgeWeapon() {
  const phrase = els.forgeInput.value.trim();
  if (phrase) return updateForgeDraft(phrase);
  const fallback = state.forgeBaseWeapon || state.menuWeapon || createWeaponFromPhrase(FALLBACK_WEAPON_PHRASE);
  return updateForgeDraft(fallback.title) || fallback;
}

function openForgeModal() {
  if (!state.game || state.game.mode !== 'menu') return;
  audio.ensure();
  audio.ui();
  state.forgeOpen = true;
  state.forgeVoiceError = false;
  const base = state.menuWeapon || state.game.menuShowcase || createWeaponFromPhrase(DEFAULT_SHOWCASE_PHRASE);
  state.forgeBaseWeapon = base;
  els.forgeInput.value = base.title;
  updateForgeDraft(base.title);
  renderWeaponMemory();
  updateForgeVoiceUi();
  refreshForgeMicPermissionState();
  showModal(els.forgeModal);
  releaseTouchControls();
  if (!coarsePointer) {
    setTimeout(() => {
      els.forgeInput.focus({ preventScroll: true });
      els.forgeInput.select();
    }, 120);
  }
}

function closeForgeModal({ restore = true } = {}) {
  state.forgeOpen = false;
  clearTimeout(state.forgePreviewTimer);
  els.forgeInput.blur?.();
  stopForgeDictation();
  hideModal(els.forgeModal);
  if (restore) {
    const weapon = state.forgeBaseWeapon || state.menuWeapon || createWeaponFromPhrase(DEFAULT_SHOWCASE_PHRASE);
    if (state.game?.mode === 'menu') state.game.previewWeapon(weapon);
    renderForgePreview(weapon);
    state.forgeDraft = null;
  }
}

function equipForgeWeapon({ start = false } = {}) {
  const weapon = getForgeWeapon();
  if (!weapon) {
    els.forgeInput.focus({ preventScroll: true });
    return;
  }

  setMenuWeapon(weapon, { remember: true });
  closeForgeModal({ restore: false });
  audio.ui(true);
  pulseHaptic(14);

  if (start) {
    startSession(Boolean(detectSpeechSupport()), false, weapon);
    return;
  }

  showToast(`ARMA EQUIPADA • ${weapon.title.toUpperCase()}`);
}

function setForgeDictating(on) {
  els.forgeDictate.setAttribute('aria-pressed', String(on));
  els.forgeDictateLabel.textContent = on ? 'OUVINDO' : 'DITAR';
}

function updateForgeVoiceUi(message = '', tone = '') {
  if (!els.forgeVoiceStatus) return;
  if (state.forgeMicPermission !== 'unknown') {
    els.forgePermission.dataset.state = state.forgeMicPermission;
  } else {
    delete els.forgePermission.dataset.state;
  }

  if (state.forgeMicPermission === 'granted') els.forgePermissionLabel.textContent = 'MICROFONE LIBERADO';
  else if (state.forgeMicPermission === 'denied') els.forgePermissionLabel.textContent = 'PERMISSÃO NEGADA';
  else if (state.forgeMicPermission === 'pending') els.forgePermissionLabel.textContent = 'SOLICITANDO…';
  else if (state.forgeMicPermission === 'unsupported') els.forgePermissionLabel.textContent = 'MICROFONE INDISPONÍVEL';
  else els.forgePermissionLabel.textContent = 'LIBERAR MICROFONE';

  els.forgeVoiceStatus.classList.toggle('ok', tone === 'ok');
  els.forgeVoiceStatus.classList.toggle('error', tone === 'error');

  if (message) {
    els.forgeVoiceStatus.textContent = message;
    return;
  }

  if (!detectSpeechSupport()) {
    els.forgeVoiceStatus.textContent = 'Reconhecimento de voz indisponível neste navegador. Digite o nome ou use o microfone do teclado.';
  } else if (state.forgeMicPermission === 'granted') {
    els.forgeVoiceStatus.textContent = 'Permissão concedida. Toque em DITAR e fale o nome da arma.';
  } else if (state.forgeMicPermission === 'denied') {
    els.forgeVoiceStatus.textContent = 'Microfone bloqueado pelo navegador. Libere nas permissões ou digite o nome.';
  } else if (state.forgeMicPermission === 'unsupported') {
    els.forgeVoiceStatus.textContent = 'Este navegador não expõe acesso ao microfone. Digite o nome da arma.';
  } else {
    els.forgeVoiceStatus.textContent = 'Toque em LIBERAR MICROFONE para pedir permissão de voz.';
  }
}

async function refreshForgeMicPermissionState() {
  if (!navigator.mediaDevices?.getUserMedia) {
    if (state.forgeMicPermission !== 'granted') state.forgeMicPermission = 'unsupported';
    if (state.forgeOpen) updateForgeVoiceUi();
    return;
  }

  if (!navigator.permissions?.query) {
    if (state.forgeOpen) updateForgeVoiceUi();
    return;
  }

  try {
    const status = await navigator.permissions.query({ name: 'microphone' });
    if (status.state === 'granted' || status.state === 'denied') {
      state.forgeMicPermission = status.state;
    }
    status.onchange = () => {
      if (status.state === 'granted' || status.state === 'denied') state.forgeMicPermission = status.state;
      else state.forgeMicPermission = 'unknown';
      if (state.forgeOpen) updateForgeVoiceUi();
    };
  } catch {
    // Some browsers do not expose the microphone permission name.
  }
  if (state.forgeOpen) updateForgeVoiceUi();
}

async function requestForgeMicPermission() {
  audio.ensure();
  state.forgeVoiceError = false;

  if (!navigator.mediaDevices?.getUserMedia) {
    state.forgeMicPermission = 'unsupported';
    updateForgeVoiceUi('Este navegador não expõe acesso ao microfone. Digite o nome da arma.', 'error');
    return;
  }

  state.forgeMicPermission = 'pending';
  updateForgeVoiceUi('Solicitando permissão de microfone…');

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    state.forgeMicPermission = 'granted';
    const speech = detectSpeechSupport();
    updateForgeVoiceUi(
      speech
        ? 'Microfone liberado. Toque em DITAR e fale o nome da arma.'
        : 'Microfone liberado, mas este navegador não reconhece voz. Digite ou use o microfone do teclado.',
      speech ? 'ok' : '',
    );
    showToast('MICROFONE LIBERADO');
    pulseHaptic(10);
  } catch (error) {
    const denied = error?.name === 'NotAllowedError' || error?.name === 'SecurityError';
    state.forgeMicPermission = denied ? 'denied' : 'unknown';
    const message = denied
      ? 'Permissão negada. Libere o microfone nas permissões do navegador e tente novamente.'
      : error?.name === 'NotFoundError'
        ? 'Nenhum microfone encontrado. Conecte um microfone ou digite o nome.'
        : 'Não foi possível abrir o microfone. Tente novamente ou digite o nome.';
    updateForgeVoiceUi(message, 'error');
    showToast('MICROFONE NÃO AUTORIZADO', 'error');
  }
}

function createForgeRecognition() {
  const Recognition = detectSpeechSupport();
  if (!Recognition) return null;
  const recognition = new Recognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    state.forgeRecognitionRunning = true;
    setForgeDictating(true);
    updateForgeVoiceUi('Ouvindo… fale o nome da arma.', 'ok');
  };

  recognition.onresult = (event) => {
    let interim = '';
    let finalText = '';
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      const transcript = result[0]?.transcript?.trim() || '';
      if (!transcript) continue;
      if (result.isFinal) finalText += `${finalText ? ' ' : ''}${transcript}`;
      else interim += `${interim ? ' ' : ''}${transcript}`;
    }

    const captured = finalText || interim;
    if (captured) {
      els.forgeInput.value = captured;
      updateForgeDraft(captured);
      state.forgeMicPermission = 'granted';
      state.forgeVoiceError = false;
      updateForgeVoiceUi(
        finalText ? 'Nome capturado. Ajuste se quiser e equipe.' : 'Ouvindo…',
        finalText ? 'ok' : '',
      );
    }
  };

  recognition.onspeechend = () => {
    updateForgeVoiceUi('Processando o nome…');
  };

  recognition.onerror = (event) => {
    if (event.error === 'aborted') return;
    state.forgeRecognitionRunning = false;
    state.forgeVoiceError = true;
    setForgeDictating(false);

    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      state.forgeMicPermission = 'denied';
      updateForgeVoiceUi('Permissão negada. Libere o microfone nas permissões do navegador ou digite o nome.', 'error');
      return;
    }
    if (event.error === 'no-speech') {
      updateForgeVoiceUi('Não ouvi nada. Toque em DITAR e tente novamente.');
      return;
    }
    if (event.error === 'audio-capture') {
      updateForgeVoiceUi('Nenhum microfone encontrado. Conecte um microfone ou digite o nome.', 'error');
      return;
    }
    updateForgeVoiceUi('Reconhecimento de voz indisponível. Digite o nome ou use o microfone do teclado.', 'error');
  };

  recognition.onend = () => {
    state.forgeRecognitionRunning = false;
    setForgeDictating(false);
    if (state.forgeOpen && !state.forgeVoiceError) updateForgeVoiceUi();
  };

  return recognition;
}

function toggleForgeDictation() {
  audio.ensure();
  state.forgeVoiceError = false;

  if (state.forgeRecognitionRunning) {
    stopForgeDictation();
    return;
  }

  if (!detectSpeechSupport()) {
    state.forgeVoiceError = true;
    updateForgeVoiceUi('Reconhecimento de voz indisponível neste navegador. Digite o nome ou use o microfone do teclado.', 'error');
    els.forgeInput.focus({ preventScroll: true });
    return;
  }

  if (!state.forgeRecognition) state.forgeRecognition = createForgeRecognition();
  if (!state.forgeRecognition) return;

  try {
    state.forgeRecognition.start();
  } catch (error) {
    if (error?.name === 'InvalidStateError') return;
    state.forgeVoiceError = true;
    updateForgeVoiceUi('Não foi possível iniciar a escuta. Verifique a permissão e tente novamente.', 'error');
  }
}

function stopForgeDictation() {
  if (state.forgeRecognition && state.forgeRecognitionRunning) {
    try {
      state.forgeRecognition.stop();
    } catch {
      /* It may already be stopped. */
    }
  }
  state.forgeRecognitionRunning = false;
  setForgeDictating(false);
  if (state.forgeOpen && !state.forgeVoiceError) updateForgeVoiceUi();
}

function initWeaponDesigner() {
  state.weaponMemory = readWeaponMemory();
  const savedPhrase = readStringPref(MENU_WEAPON_KEY, '').trim();
  if (savedPhrase) {
    setMenuWeapon(createWeaponFromPhrase(savedPhrase));
  } else {
    updateMenuWeaponStatus();
  }
  renderWeaponMemory();
  updateForgeVoiceUi();
  refreshForgeMicPermissionState();
}

/* ============================================================
   Game callbacks
   ============================================================ */

const gameCallbacks = {
  onWeapon(weapon, animate) {
    if (!weapon) return;
    document.documentElement.style.setProperty('--weapon-accent', weapon.accent);
    document.documentElement.style.setProperty('--weapon-accent-rgb', weapon.accentRgb);
    els.weaponName.textContent = weapon.name;
    els.weaponName.title = weapon.title;
    els.weaponRarity.textContent = weapon.rarity.label;
    els.weaponRarity.style.color = weapon.rarity.color;
    els.weaponKind.textContent = weapon.kind;
    els.weaponElement.textContent = weapon.element.label;
    els.weaponMode.textContent = weapon.mode;
    els.statDamage.style.width = `${weapon.bars.damage}%`;
    els.statRate.style.width = `${weapon.bars.rate}%`;
    els.statDamageNum.textContent = String(weapon.stats.displayedDamage);
    els.statRateNum.textContent = `${weapon.stats.rate}`;

    if (animate) {
      rememberWeapon(weapon);
      els.weaponCard.classList.remove('materialize');
      void els.weaponCard.offsetWidth;
      els.weaponCard.classList.add('materialize');
      if (els.harvestHud.classList.contains('is-hidden')) {
        showToast(`ARMA MATERIALIZADA • ${weapon.rarity.label}`);
      }
      flashDamage();
      pulseHaptic(18);
    }
  },

  onHarvestStart(harvest) {
    if (!harvest) return;
    updateHarvestUi(harvest);
    updateTranscript(`Coletando “${harvest.phrase}” • 0/${harvest.total} bloquinhos`, false);
  },

  onHarvestProgress(harvest) {
    if (!harvest) return;
    updateHarvestUi(harvest);
    updateTranscript(`Coletando “${harvest.phrase}” • ${harvest.collected}/${harvest.total} bloquinhos`, false);
    if (harvest.collected % 10 === 0) pulseHaptic(8);
  },

  onHarvestComplete(harvest) {
    if (!harvest) return;
    updateHarvestUi(harvest);
    els.harvestHud.classList.add('complete');
    els.harvestKicker.textContent = 'FORJA PRONTA';
    els.harvestHint.textContent = 'FORJA PRONTA • ARMA MATERIALIZADA';
    updateTranscript(`“${harvest.phrase}” → ${harvest.weapon.kind}`, false);
    clearTimeout(state.harvestHideTimer);
    state.harvestHideTimer = setTimeout(() => {
      hideHarvestUi();
      state.harvestHideTimer = null;
    }, 1900);
  },

  onHarvestCancel() {
    hideHarvestUi();
  },

  onHealth(value, max) {
    const rounded = Math.max(0, Math.round(value));
    const percentage = Math.max(0, Math.min(100, (value / max) * 100));
    const previous = state.lastHealthShown;
    els.healthFill.style.width = `${percentage}%`;
    els.healthValue.textContent = String(rounded);
    els.healthFill.classList.toggle('low', percentage <= 30);
    els.healthValue.style.color = percentage <= 30 ? '#ff5a6e' : '';
    if (rounded < previous) flashDamage();
    state.lastHealthShown = rounded;
  },

  onWave(wave) {
    els.waveLabel.textContent = `ONDA ${String(wave).padStart(2, '0')}`;
  },

  onWaveStart(wave, count) {
    showWaveBanner('CONTENÇÃO', `ONDA ${String(wave).padStart(2, '0')}`, `${count} HOSTIS DETECTADOS`);
  },

  onWaveClear(wave) {
    showWaveBanner('SETOR LIMPO', 'ONDA VENCIDA', 'INTEGRIDADE RECUPERADA +10');
  },

  onEnemyCount(count) {
    els.hostilesLabel.textContent = `${String(count).padStart(2, '0')} ${count === 1 ? 'HOSTIL' : 'HOSTIS'}`;
  },

  onScore(score, combo, gained) {
    els.scoreValue.textContent = formatNumber(score);
    els.comboValue.textContent = combo > 1 ? `COMBO ×${combo}${gained ? ` +${gained}` : ''}` : '';
    if (gained) {
      clearTimeout(state.scorePopTimer);
      els.scoreValue.classList.remove('pop');
      void els.scoreValue.offsetWidth;
      els.scoreValue.classList.add('pop');
      state.scorePopTimer = setTimeout(() => els.scoreValue.classList.remove('pop'), 260);
    }
  },

  onCombo(combo) {
    els.comboValue.textContent = combo > 1 ? `COMBO ×${combo}` : '';
  },

  onHit(crit) {
    els.hitmarker.classList.remove('show');
    els.hitmarker.classList.toggle('crit', Boolean(crit));
    void els.hitmarker.offsetWidth;
    els.hitmarker.classList.add('show');
    els.crosshair.classList.remove('recoil');
    void els.crosshair.offsetWidth;
    els.crosshair.classList.add('recoil');
    setTimeout(() => els.crosshair.classList.remove('recoil'), 90);
    pulseHaptic(crit ? 22 : 10);
  },

  onKill({ type, score, crit, combo }) {
    const item = document.createElement('div');
    item.className = `kill-item${crit ? ' crit' : ''}`;
    item.innerHTML = `<b>${type}</b> +${score}${combo > 1 ? ` · ×${combo}` : ''}`;
    els.killfeed.prepend(item);
    while (els.killfeed.children.length > 4) els.killfeed.lastElementChild.remove();
    setTimeout(() => item.remove(), 2700);
    pulseHaptic(16);
  },

  onDamageNumber({ position, amount, crit, color }) {
    if (!state.game) return;
    const projected = position.clone().project(state.game.camera);
    if (projected.z < -1 || projected.z > 1) return;
    const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
    if (x < -50 || x > window.innerWidth + 50 || y < -50 || y > window.innerHeight + 50) return;
    if (els.hud.classList.contains('is-hidden') || state.game.mode !== 'playing') return;

    const node = document.createElement('div');
    node.className = `damage-number${crit ? ' crit' : ''}`;
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.color = crit ? '' : color;
    node.textContent = String(Math.round(amount));
    els.hud.appendChild(node);
    setTimeout(() => node.remove(), 760);
  },

  onPlayerHit() {
    flashDamage();
    pulseHaptic(35);
  },

  onGameOver(result) {
    clearTimeout(state.overTimer);
    const token = state.runToken;
    state.overTimer = setTimeout(() => {
      if (!state.game || state.game.mode !== 'over' || token !== state.runToken) return;
      stopVoice();
      els.finalScore.textContent = formatNumber(result.score).replace(/^0+/, '') || '0';
      els.finalWave.textContent = String(result.wave);
      els.finalKills.textContent = String(result.kills);
      els.finalWeapon.innerHTML = 'ÚLTIMA ARMA<br /><b></b>';
      els.finalWeapon.querySelector('b').textContent = result.weapon?.title || '—';
      document.documentElement.style.setProperty('--weapon-accent', result.weapon?.accent || '#d7ff45');
      document.documentElement.style.setProperty('--weapon-accent-rgb', result.weapon?.accentRgb || '215, 255, 69');
      hideHarvestUi();
      showModal(els.gameoverModal);
      releaseTouchControls();
      if (document.pointerLockElement) document.exitPointerLock?.();
    }, 850);
  },
};

/* ============================================================
   Boot
   ============================================================ */

function createGame() {
  try {
    state.game = new Game(els.canvas, gameCallbacks, audio);
    window.__VOX__ = {
      game: state.game,
      audio,
      forge: (phrase) => state.game.forgeWeapon(phrase),
      harvest: () => state.game.getHarvestState(),
      start: (voice = false) => startSession(Boolean(voice), true),
      togglePause: () => togglePause(),
      design: (phrase) => {
        const weapon = createWeaponFromPhrase(phrase);
        setMenuWeapon(weapon, { remember: true });
        return weapon;
      },
      preview: (phrase) => updateForgeDraft(phrase),
      openForge: () => openForgeModal(),
      closeForge: () => closeForgeModal(),
      getMenuWeapon: () => state.menuWeapon,
      getWeaponMemory: () => state.weaponMemory.slice(),
      getVoicePermission: () => state.forgeMicPermission,
      spawn: () => {
        if (state.game.mode === 'playing') state.game.spawnEnemy('drone');
      },
      getTiltState: () => ({
        enabled: state.tiltOn,
        active: state.tiltActive,
        raw: state.tiltRaw,
        baseline: state.tiltBaseline,
        yaw: state.tiltSmoothYaw,
        pitch: state.tiltSmoothPitch,
      }),
    };
  } catch (error) {
    console.error(error);
    els.boot.innerHTML = `
      <div style="max-width:390px;text-align:center;padding:24px">
        <div style="font-family:var(--display);color:var(--danger);font-size:13px;letter-spacing:.16em;margin-bottom:12px">WEBGL INDISPONÍVEL</div>
        <p style="font-size:12px;line-height:1.7;color:var(--muted)">Este navegador não conseguiu iniciar a arena 3D. Ative a aceleração de hardware ou tente outro navegador atualizado.</p>
      </div>`;
    return false;
  }

  applyPreferences();
  setupInterface();
  initWeaponDesigner();
  updateVoiceSupportUi();
  updateWeaponFromDefault();
  requestAnimationFrame(() => {
    setTimeout(() => els.boot.classList.add('done'), 420);
  });
  handleQueryParameters();
  requestAnimationFrame(loop);
  return true;
}

function applyPreferences() {
  audio.setMuted(!state.soundOn);
  els.soundToggle.setAttribute('aria-checked', String(state.soundOn));
  els.tiltToggle.setAttribute('aria-checked', String(state.tiltOn));
  updateTiltUi();
  updateMicUI(false);
}

function updateWeaponFromDefault() {
  if (state.game?.weapon) gameCallbacks.onWeapon(state.game.weapon, false);
}

function updateVoiceSupportUi() {
  const supported = detectSpeechSupport();
  if (els.voiceNote) els.voiceNote.classList.toggle('is-hidden', supported);
  if (supported) return;
  const title = els.startBtn.querySelector('.btn-copy strong');
  const subtitle = els.startBtn.querySelector('.btn-copy small');
  if (title) title.textContent = 'JOGAR DIGITANDO';
  if (subtitle) subtitle.textContent = 'voz indisponível • forje armas por texto';
}

function handleQueryParameters() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('play') === '1') {
    state.autoStarted = true;
    const phrase = params.get('weapon');
    setTimeout(() => {
      startSession(false, true);
      if (phrase) {
        setTimeout(() => {
          if (state.game.mode === 'playing') state.game.forgeWeapon(phrase);
        }, 650);
      }
    }, 720);
  }
}

/* ============================================================
   Session flow
   ============================================================ */

function startSession(withVoice, instant = false, starterWeapon = state.menuWeapon) {
  if (!state.game) return;
  if (state.game.mode === 'playing') return;

  if (state.goodbyeTimer) clearTimeout(state.goodbyeTimer);
  state.runToken += 1;
  clearTimeout(state.overTimer);
  hideModal(els.gameoverModal);
  hideModal(els.pauseModal);
  hideModal(els.micModal);
  hideModal(els.typeModal);
  hideModal(els.forgeModal);
  state.forgeOpen = false;
  stopForgeDictation();

  if (withVoice) {
    state.preferredVoice = true;
    writePref('vox_voice', true);
    startVoice();
  } else {
    state.preferredVoice = false;
    writePref('vox_voice', false);
    stopVoice();
  }

  audio.ensure();
  audio.setMuted(!state.soundOn);

  if (state.tiltOn) requestTiltPermission();

  state.keys.clear();
  state.spaceDown = false;
  state.fireDown = false;
  state.mouseFireDown = false;
  state.lastHealthShown = 100;
  state.gameStartedAt = performance.now();
  updateMicUI(state.voiceWanted);

  if (instant) {
    els.menu.classList.add('is-hidden');
    els.menu.classList.remove('leaving');
  } else {
    els.menu.classList.add('leaving');
    clearTimeout(state.menuAnimationTimer);
    state.menuAnimationTimer = setTimeout(() => els.menu.classList.add('is-hidden'), 560);
  }
  els.hud.classList.remove('is-hidden');
  state.game.startRun(starterWeapon);
  hideHarvestUi();
  resetTranscript();
  updateMicUI(state.voiceWanted);
  requestAnimationFrame(() => {
    if (!coarsePointer) els.desktopHint.classList.remove('is-hidden');
  });
}

function returnToMenu() {
  if (!state.game) return;
  state.runToken += 1;
  clearTimeout(state.overTimer);
  stopVoice();
  stopForgeDictation();
  releaseTouchControls();
  state.game.showMenu();
  if (state.menuWeapon) state.game.previewWeapon(state.menuWeapon);
  hideHarvestUi();
  hideModal(els.pauseModal);
  hideModal(els.gameoverModal);
  hideModal(els.typeModal);
  hideModal(els.micModal);
  hideModal(els.forgeModal);
  state.forgeOpen = false;
  els.hud.classList.add('is-hidden');
  els.menu.classList.remove('is-hidden', 'leaving');
  els.menu.style.animation = 'none';
  void els.menu.offsetWidth;
  els.menu.style.animation = '';
  updateMicUI(false);
  if (document.pointerLockElement) document.exitPointerLock?.();
}

function restartSession() {
  if (!state.game) return;
  hideModal(els.gameoverModal);
  state.runToken += 1;
  state.lastHealthShown = 100;
  state.game.startRun(state.menuWeapon);
  hideHarvestUi();
  els.hud.classList.remove('is-hidden');
  els.menu.classList.add('is-hidden');
  resetTranscript();
  if (state.preferredVoice) startVoice();
  updateMicUI(state.voiceWanted);
  audio.ui(true);
}

/* ============================================================
   Pause / modals
   ============================================================ */

function openPause() {
  if (!state.game || state.game.mode !== 'playing') return;
  state.game.pause();
  suspendVoice();
  els.pauseScore.textContent = formatNumber(state.game.score).replace(/^0+/, '') || '0';
  els.pauseWave.textContent = String(Math.max(1, state.game.wave));
  showModal(els.pauseModal);
  releaseTouchControls();
  updateCalibrateButton();
  if (document.pointerLockElement) document.exitPointerLock?.();
}

function closePause() {
  hideModal(els.pauseModal);
  if (!state.game) return;
  state.game.resume();
  resumeVoice();
  audio.ui();
}

function openTypeModal() {
  if (!state.game) return;
  state.pausedForType = state.game.mode === 'playing';
  if (state.pausedForType) {
    state.game.pause();
    suspendVoice();
  }
  showModal(els.typeModal);
  els.typeInput.value = '';
  setTimeout(() => els.typeInput.focus({ preventScroll: true }), 120);
  releaseTouchControls();
}

function closeTypeModal() {
  hideModal(els.typeModal);
  if (state.pausedForType && state.game?.mode === 'paused') {
    state.game.resume();
    resumeVoice();
  }
  state.pausedForType = false;
  if (document.pointerLockElement) document.exitPointerLock?.();
}

function showMicDenied(message) {
  if (!state.game) return;
  if (state.game.mode === 'playing') state.game.pause();
  suspendVoice();
  els.micMessage.textContent = message;
  showModal(els.micModal);
  releaseTouchControls();
}

function skipMicrophone() {
  hideModal(els.micModal);
  if (state.game?.mode === 'paused') state.game.resume();
  openTypeModal();
}

function togglePause() {
  if (!state.game) return;
  if (state.game.mode === 'playing') openPause();
  else if (state.game.mode === 'paused' && !els.pauseModal.classList.contains('is-hidden')) closePause();
}

/* ============================================================
   Speech recognition
   ============================================================ */

function detectSpeechSupport() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  state.speechSupported = Boolean(Recognition);
  return Recognition;
}

function createRecognition() {
  const Recognition = detectSpeechSupport();
  if (!Recognition) return null;
  const recognition = new Recognition();
  recognition.lang = 'pt-BR';
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    state.recognitionRunning = true;
    state.recognitionErrorCount = 0;
    updateMicUI(true);
  };

  recognition.onresult = (event) => {
    let interim = '';
    let finalText = '';
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      const transcript = result[0]?.transcript?.trim() || '';
      if (!transcript) continue;
      if (result.isFinal) finalText += `${finalText ? ' ' : ''}${transcript}`;
      else interim += `${interim ? ' ' : ''}${transcript}`;
    }

    if (interim) updateTranscript(`“${interim}”`, true);
    if (finalText) {
      updateTranscript(`“${finalText}”`, true);
      forgeFromSpeech(finalText);
    }
  };

  recognition.onspeechstart = () => {
    state.speechPulse = 1;
    updateTranscript('Ouvindo…', true);
  };

  recognition.onspeechend = () => {
    state.speechPulse = 0.4;
  };

  recognition.onerror = (event) => {
    if (event.error === 'aborted') return;
    if (event.error === 'no-speech' || event.error === 'audio-capture') {
      if (event.error === 'audio-capture') {
        state.voiceWanted = false;
        updateMicUI(false);
        showMicDenied('Nenhum microfone foi encontrado. Conecte um microfone ou use o modo de digitação.');
      }
      return;
    }

    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      state.voiceWanted = false;
      updateMicUI(false);
      showMicDenied('Libere o microfone nas permissões do navegador e tente novamente. Você também pode jogar digitando suas armas.');
      return;
    }

    if (event.error === 'network' || event.error === 'language-not-supported' || event.error === 'service-unavailable') {
      state.voiceWanted = false;
      state.recognitionRunning = false;
      updateMicUI(false);
      showToast('Reconhecimento de voz indisponível. Use DIGITAR para criar armas.', 'error');
      resetTranscript();
      return;
    }

    if (state.recognitionErrorCount < 2) {
      state.recognitionErrorCount += 1;
      showToast('O microfone oscilou. Tentando reconectar…', 'error');
    }
  };

  recognition.onend = () => {
    state.recognitionRunning = false;
    if (!state.voiceWanted) {
      updateMicUI(false);
      return;
    }
    if (!state.game || state.game.mode !== 'playing' || document.hidden) {
      updateMicUI(false);
      return;
    }
    clearTimeout(state.recognitionRestartTimer);
    state.recognitionRestartTimer = setTimeout(() => {
      if (state.voiceWanted && state.game?.mode === 'playing' && !state.recognitionRunning) {
        startVoice();
      }
    }, 420);
  };

  return recognition;
}

function startVoice() {
  if (!state.game) return false;
  if (!detectSpeechSupport()) {
    state.voiceWanted = false;
    updateMicUI(false);
    showToast('Este navegador não tem reconhecimento de voz. Use DIGITAR.', 'error');
    return false;
  }

  state.voiceWanted = true;
  state.preferredVoice = true;
  if (!state.recognition) state.recognition = createRecognition();
  if (!state.recognition) return false;

  if (state.recognitionRunning) {
    updateMicUI(true);
    return true;
  }

  try {
    state.recognition.start();
    updateMicUI(true);
    resetTranscript();
    return true;
  } catch (error) {
    // InvalidStateError means it is already booting; that is fine.
    if (error?.name === 'InvalidStateError') {
      updateMicUI(true);
      return true;
    }
    state.voiceWanted = false;
    updateMicUI(false);
    showMicDenied('O navegador não conseguiu abrir o microfone. Verifique a permissão e tente novamente.');
    return false;
  }
}

function stopVoice() {
  state.voiceWanted = false;
  clearTimeout(state.recognitionRestartTimer);
  if (state.recognition) {
    try {
      state.recognition.stop();
    } catch {
      /* It may already be stopped. */
    }
  }
  state.recognitionRunning = false;
  updateMicUI(false);
}

function suspendVoice() {
  clearTimeout(state.recognitionRestartTimer);
  if (state.recognition && state.recognitionRunning) {
    try {
      state.recognition.stop();
    } catch {
      /* no-op */
    }
  }
  state.recognitionRunning = false;
  updateMicUI(false);
}

function resumeVoice() {
  if (!state.preferredVoice || !state.game || state.game.mode !== 'playing') return;
  clearTimeout(state.recognitionRestartTimer);
  setTimeout(() => {
    if (state.game?.mode === 'playing' && state.preferredVoice) startVoice();
  }, 260);
}

function forgeFromSpeech(phrase) {
  if (!state.game || state.game.mode !== 'playing') return;
  const clean = String(phrase).replace(/\s+/g, ' ').trim();
  if (!clean) return;
  const key = clean.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const now = performance.now();
  if (key === state.lastPhrase && now - state.lastPhraseAt < 1400) return;
  // Speech recognition can split one utterance into several final chunks.
  // Do not restart an active harvest with those fragments.
  if (state.game.getHarvestState() && now - state.lastPhraseAt < 2200) return;
  state.lastPhrase = key;
  state.lastPhraseAt = now;
  const weapon = state.game.forgeWeapon(clean);
  const harvest = state.game.getHarvestState();
  if (weapon && harvest) {
    updateTranscript(`Coletando “${clean}” • 0/${harvest.total} bloquinhos`, false);
  } else if (weapon) {
    showToast(`“${clean}” → ${weapon.kind}`);
  }
}

/* ============================================================
   Motion / tilt
   ============================================================ */

function updateTiltUi() {
  els.tiltToggle.setAttribute('aria-checked', String(state.tiltOn));
  els.tiltBadge.classList.toggle('is-hidden', !state.tiltActive);
  updateCalibrateButton();
}

function updateCalibrateButton() {
  if (!els.calibrateBtn) return;
  els.calibrateBtn.disabled = false;
  els.calibrateBtn.textContent = state.tiltActive ? 'Recalibrar inclinação' : 'Ativar inclinação';
}

function attachTiltListener() {
  if (state.tiltListenerAttached) return;
  window.addEventListener('deviceorientation', handleOrientation, true);
  state.tiltListenerAttached = true;
}

function detachTiltListener() {
  if (!state.tiltListenerAttached) return;
  window.removeEventListener('deviceorientation', handleOrientation, true);
  state.tiltListenerAttached = false;
}

function enableTilt() {
  state.tiltOn = true;
  writePref('vox_tilt', true);
  attachTiltListener();
  state.tiltActive = true;
  state.tiltBaseline = null;
  state.tiltSmoothYaw = 0;
  state.tiltSmoothPitch = 0;
  state.game?.setTilt(0, 0);
  updateTiltUi();
}

function disableTilt(updatePreference = true) {
  if (updatePreference) {
    state.tiltOn = false;
    writePref('vox_tilt', false);
  }
  detachTiltListener();
  state.tiltActive = false;
  state.tiltBaseline = null;
  state.tiltSmoothYaw = 0;
  state.tiltSmoothPitch = 0;
  state.game?.setTilt(0, 0);
  updateTiltUi();
}

async function requestTiltPermission() {
  if (!state.tiltOn) return;
  if (!window.DeviceOrientationEvent) {
    disableTilt();
    showToast('Este aparelho não tem sensor de inclinação.', 'error');
    return;
  }

  const requestPermission = window.DeviceOrientationEvent.requestPermission;
  if (typeof requestPermission === 'function') {
    try {
      const result = await requestPermission.call(window.DeviceOrientationEvent);
      if (result === 'granted') {
        enableTilt();
      } else {
        disableTilt();
        showToast('Permissão de movimento negada.', 'error');
      }
    } catch (error) {
      disableTilt();
      showToast('Não foi possível ativar a inclinação neste navegador.', 'error');
    }
    return;
  }

  enableTilt();
}

function handleOrientation(event) {
  if (!state.tiltActive) return;
  if (event.beta === null || event.gamma === null) return;
  state.tiltRaw = { beta: event.beta, gamma: event.gamma };
  if (!state.tiltBaseline) {
    state.tiltBaseline = { beta: event.beta, gamma: event.gamma };
    state.tiltSmoothYaw = 0;
    state.tiltSmoothPitch = 0;
  }
}

function calibrateTilt() {
  if (!state.tiltActive) {
    requestTiltPermission();
    return;
  }
  state.tiltBaseline = null;
  state.tiltSmoothYaw = 0;
  state.tiltSmoothPitch = 0;
  state.game?.setTilt(0, 0);
  showToast('INCLINAÇÃO RECALIBRADA • MANTENHA O APARELHO NA POSIÇÃO ATUAL');
}

function updateTilt(dt) {
  if (!state.tiltActive || !state.tiltRaw || !state.tiltBaseline || !state.game) return;
  const raw = state.tiltRaw;
  const base = state.tiltBaseline;
  const angle = typeof screen.orientation?.angle === 'number'
    ? screen.orientation.angle
    : (window.orientation || 0);
  const landscape = Math.abs(angle) === 90 || Math.abs(angle) === 270;

  const deltaGamma = raw.gamma - base.gamma;
  const deltaBeta = raw.beta - base.beta;
  let yawTarget;
  let pitchTarget;

  if (landscape) {
    yawTarget = -clamp(deltaBeta * 0.011, -0.8, 0.8);
    pitchTarget = clamp(deltaGamma * 0.008, -0.5, 0.5);
  } else {
    yawTarget = -clamp(deltaGamma * 0.012, -0.8, 0.8);
    pitchTarget = -clamp(deltaBeta * 0.0065, -0.48, 0.48);
  }

  const smoothing = 1 - Math.exp(-dt * 11);
  state.tiltSmoothYaw += (yawTarget - state.tiltSmoothYaw) * smoothing;
  state.tiltSmoothPitch += (pitchTarget - state.tiltSmoothPitch) * smoothing;
  state.game.setTilt(state.tiltSmoothYaw, state.tiltSmoothPitch);
}

/* ============================================================
   Input
   ============================================================ */

function updateMovementInput() {
  if (!state.game) return;
  let forward = 0;
  let strafe = 0;

  if (state.keys.has('KeyW') || state.keys.has('ArrowUp')) forward += 1;
  if (state.keys.has('KeyS') || state.keys.has('ArrowDown')) forward -= 1;
  if (state.keys.has('KeyD') || state.keys.has('ArrowRight')) strafe += 1;
  if (state.keys.has('KeyA') || state.keys.has('ArrowLeft')) strafe -= 1;

  if (state.joystickPointerId !== null) {
    forward += -state.joystickY;
    strafe += state.joystickX;
  }

  const magnitude = Math.hypot(forward, strafe);
  if (magnitude > 1) {
    forward /= magnitude;
    strafe /= magnitude;
  }

  state.game.controls.forward = forward;
  state.game.controls.strafe = strafe;
  state.game.controls.fire = Boolean(state.fireDown || state.spaceDown || state.mouseFireDown);
}

function releaseTouchControls() {
  state.fireDown = false;
  state.mouseFireDown = false;
  state.spaceDown = false;
  state.lookPointerId = null;
  state.joystickPointerId = null;
  state.joystickX = 0;
  state.joystickY = 0;
  els.fireBtn.classList.remove('pressed');
  els.joystickThumb.style.transform = '';
  if (state.game) {
    state.game.controls.fire = false;
    state.game.controls.forward = 0;
    state.game.controls.strafe = 0;
  }
}

function updateJoystickFromEvent(event) {
  const rect = els.joystick.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  let dx = event.clientX - centerX;
  let dy = event.clientY - centerY;
  const maxRadius = rect.width * 0.36;
  const distance = Math.hypot(dx, dy);
  if (distance > maxRadius) {
    dx = (dx / distance) * maxRadius;
    dy = (dy / distance) * maxRadius;
  }
  const normalizedX = dx / maxRadius;
  const normalizedY = dy / maxRadius;
  state.joystickX = Math.abs(normalizedX) < 0.08 ? 0 : normalizedX;
  state.joystickY = Math.abs(normalizedY) < 0.08 ? 0 : normalizedY;
  els.joystickThumb.style.transform = `translate(${dx}px, ${dy}px)`;
}

function configureInput() {
  window.addEventListener('keydown', (event) => {
    const tag = event.target?.tagName;
    const typing = tag === 'INPUT' || tag === 'TEXTAREA';
    if (event.code === 'Escape') {
      if (!els.forgeModal.classList.contains('is-hidden')) {
        closeForgeModal();
        return;
      }
      if (!els.typeModal.classList.contains('is-hidden')) {
        closeTypeModal();
        return;
      }
      if (!els.pauseModal.classList.contains('is-hidden')) {
        closePause();
        return;
      }
      if (!els.micModal.classList.contains('is-hidden')) {
        skipMicrophone();
        return;
      }
      togglePause();
      return;
    }
    if (typing) return;
    if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
      if (state.game?.mode === 'playing') event.preventDefault();
    }
    state.keys.add(event.code);
    if (event.code === 'Space') state.spaceDown = true;
  });

  window.addEventListener('keyup', (event) => {
    state.keys.delete(event.code);
    if (event.code === 'Space') state.spaceDown = false;
  });

  window.addEventListener('blur', () => {
    state.keys.clear();
    state.spaceDown = false;
    state.fireDown = false;
    state.mouseFireDown = false;
  });

  els.canvas.addEventListener('pointerdown', (event) => {
    if (!state.game || state.game.mode !== 'playing') return;
    if (event.pointerType === 'mouse') {
      if (!state.pointerLocked) {
        els.canvas.requestPointerLock?.();
      }
      return;
    }
    if (state.lookPointerId !== null) return;
    state.lookPointerId = event.pointerId;
    state.lookLastX = event.clientX;
    state.lookLastY = event.clientY;
    els.canvas.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  els.canvas.addEventListener('pointermove', (event) => {
    if (event.pointerId !== state.lookPointerId || !state.game) return;
    const dx = event.clientX - state.lookLastX;
    const dy = event.clientY - state.lookLastY;
    state.lookLastX = event.clientX;
    state.lookLastY = event.clientY;
    state.game.addLook(dx, dy, 0.0042);
  });

  const releaseLook = (event) => {
    if (event.pointerId === state.lookPointerId) state.lookPointerId = null;
  };
  els.canvas.addEventListener('pointerup', releaseLook);
  els.canvas.addEventListener('pointercancel', releaseLook);

  document.addEventListener('mousemove', (event) => {
    if (document.pointerLockElement !== els.canvas) return;
    if (!state.game || state.game.mode !== 'playing') return;
    state.game.addLook(event.movementX, event.movementY, 0.0019);
  });

  els.canvas.addEventListener('mousedown', (event) => {
    if (event.button !== 0 || !state.game || state.game.mode !== 'playing') return;
    if (document.pointerLockElement !== els.canvas) {
      els.canvas.requestPointerLock?.();
      return;
    }
    state.mouseFireDown = true;
  });

  window.addEventListener('mouseup', () => {
    state.mouseFireDown = false;
  });

  document.addEventListener('pointerlockchange', () => {
    state.pointerLocked = document.pointerLockElement === els.canvas;
    if (!coarsePointer) {
      els.desktopHint.classList.toggle('is-hidden', state.pointerLocked);
    }
  });

  els.canvas.addEventListener('contextmenu', (event) => event.preventDefault());

  // Fire button supports press-and-hold and multiple touch points.
  els.fireBtn.addEventListener('pointerdown', (event) => {
    if (!state.game || state.game.mode !== 'playing') return;
    event.preventDefault();
    event.stopPropagation();
    state.fireDown = true;
    els.fireBtn.classList.add('pressed');
    els.fireBtn.setPointerCapture?.(event.pointerId);
    audio.ensure();
  });
  const releaseFire = (event) => {
    if (event) event.preventDefault?.();
    state.fireDown = false;
    els.fireBtn.classList.remove('pressed');
  };
  els.fireBtn.addEventListener('pointerup', releaseFire);
  els.fireBtn.addEventListener('pointercancel', releaseFire);
  els.fireBtn.addEventListener('lostpointercapture', releaseFire);

  // Joystick.
  els.joystick.addEventListener('pointerdown', (event) => {
    if (!state.game || state.game.mode !== 'playing') return;
    if (state.joystickPointerId !== null) return;
    event.preventDefault();
    state.joystickPointerId = event.pointerId;
    els.joystick.setPointerCapture?.(event.pointerId);
    updateJoystickFromEvent(event);
  });
  els.joystick.addEventListener('pointermove', (event) => {
    if (event.pointerId !== state.joystickPointerId) return;
    event.preventDefault();
    updateJoystickFromEvent(event);
  });
  const releaseJoystick = (event) => {
    if (event.pointerId !== state.joystickPointerId) return;
    state.joystickPointerId = null;
    state.joystickX = 0;
    state.joystickY = 0;
    els.joystickThumb.style.transform = '';
  };
  els.joystick.addEventListener('pointerup', releaseJoystick);
  els.joystick.addEventListener('pointercancel', releaseJoystick);
  els.joystick.addEventListener('lostpointercapture', releaseJoystick);

  window.addEventListener('pointerup', () => {
    // Safety: if a touch ends outside its target, no control should stay stuck.
    if (!els.fireBtn.matches(':active')) {
      state.fireDown = false;
      els.fireBtn.classList.remove('pressed');
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (state.game?.mode === 'playing') openPause();
      audio.ctx?.suspend?.();
      return;
    }
    if (audio.ctx?.state === 'suspended' && state.soundOn) audio.ctx.resume().catch(() => {});
    if (state.game?.mode === 'playing' && state.preferredVoice) resumeVoice();
  });

  window.addEventListener('resize', () => {
    // Keep the UI stable when iOS hides the URL bar while typing.
    if (state.game?.mode === 'paused') {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    }
  });
}

/* ============================================================
   UI event wiring
   ============================================================ */

function setupInterface() {
  configureInput();

  els.startBtn.addEventListener('click', () => {
    audio.ensure();
    const supported = detectSpeechSupport();
    startSession(supported);
    if (!supported) setTimeout(openTypeModal, 650);
  });

  els.silentBtn.addEventListener('click', () => {
    audio.ensure();
    startSession(false);
  });

  els.forgeStartBtn.addEventListener('click', () => {
    openForgeModal();
  });

  els.forgeDismiss.addEventListener('click', () => closeForgeModal());
  els.forgeClose.addEventListener('click', () => closeForgeModal());

  els.forgeModal.addEventListener('pointerdown', (event) => {
    if (event.target === els.forgeModal) closeForgeModal();
  });

  els.forgeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    equipForgeWeapon();
  });

  els.forgeInput.addEventListener('input', () => {
    scheduleForgeDraft();
  });

  els.forgePlay.addEventListener('click', () => {
    equipForgeWeapon({ start: true });
  });

  els.forgeEquip.addEventListener('click', () => {
    equipForgeWeapon();
  });

  els.forgeDictate.addEventListener('click', () => {
    toggleForgeDictation();
  });

  els.forgePermission.addEventListener('click', () => {
    requestForgeMicPermission();
  });

  document.querySelectorAll('[data-forge-phrase]').forEach((button) => {
    button.addEventListener('click', () => {
      const phrase = button.getAttribute('data-forge-phrase') || '';
      els.forgeInput.value = phrase;
      updateForgeDraft(phrase);
      if (!coarsePointer) els.forgeInput.focus({ preventScroll: true });
    });
  });

  els.soundToggle.addEventListener('click', () => {
    state.soundOn = !state.soundOn;
    writePref('vox_sound', state.soundOn);
    els.soundToggle.setAttribute('aria-checked', String(state.soundOn));
    audio.ensure();
    audio.setMuted(!state.soundOn);
    if (state.soundOn) audio.ui(true);
  });

  els.tiltToggle.addEventListener('click', () => {
    state.tiltOn = !state.tiltOn;
    writePref('vox_tilt', state.tiltOn);
    if (!state.tiltOn) {
      disableTilt(false);
    } else {
      els.tiltToggle.setAttribute('aria-checked', 'true');
      if (state.game?.mode === 'playing') requestTiltPermission();
    }
  });

  els.pauseBtn.addEventListener('click', () => {
    audio.ui();
    openPause();
  });

  els.resumeBtn.addEventListener('click', () => {
    closePause();
  });

  els.calibrateBtn.addEventListener('click', () => {
    calibrateTilt();
  });

  els.quitBtn.addEventListener('click', () => {
    audio.ui();
    returnToMenu();
  });

  els.micBtn.addEventListener('click', () => {
    if (!state.game) return;
    if (state.voiceWanted) {
      state.preferredVoice = false;
      writePref('vox_voice', false);
      stopVoice();
      updateTranscript('Microfone pausado. Toque no ícone para reativar.', false);
      showToast('MICROFONE EM PAUSA');
      return;
    }
    state.preferredVoice = true;
    writePref('vox_voice', true);
    startVoice();
  });

  els.typeBtn.addEventListener('click', () => {
    audio.ui();
    openTypeModal();
  });

  els.typeClose.addEventListener('click', () => {
    closeTypeModal();
  });

  els.typeModal.addEventListener('pointerdown', (event) => {
    if (event.target === els.typeModal) closeTypeModal();
  });

  els.typeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const phrase = els.typeInput.value.trim();
    if (!phrase) {
      els.typeInput.focus();
      return;
    }
    closeTypeModal();
    if (state.game && state.game.mode === 'playing') {
      const weapon = state.game.forgeWeapon(phrase);
      const harvest = state.game.getHarvestState();
      if (weapon && harvest) {
        updateTranscript(`Coletando “${phrase}” • 0/${harvest.total} bloquinhos`, false);
      } else if (weapon) {
        updateTranscript(`“${phrase}” → ${weapon.kind}`, false);
      }
    }
  });

  document.querySelectorAll('[data-phrase]').forEach((button) => {
    button.addEventListener('click', () => {
      els.typeInput.value = button.getAttribute('data-phrase') || '';
      els.typeInput.focus();
    });
  });

  els.micRetry.addEventListener('click', () => {
    hideModal(els.micModal);
    if (state.game?.mode === 'paused') state.game.resume();
    startVoice();
    resumeVoice();
  });

  els.micSkip.addEventListener('click', () => {
    skipMicrophone();
  });

  els.gameoverModal.addEventListener('pointerdown', (event) => {
    if (event.target === els.gameoverModal) {
      // Do not dismiss the run summary accidentally.
    }
  });

  els.restartBtn.addEventListener('click', () => {
    audio.ensure();
    restartSession();
  });

  els.menuBtn.addEventListener('click', () => {
    returnToMenu();
  });

  els.pauseModal.addEventListener('pointerdown', (event) => {
    if (event.target === els.pauseModal) closePause();
  });

  window.addEventListener('beforeunload', () => {
    stopVoice();
  });
}

/* ============================================================
   Main loop
   ============================================================ */

let lastFrame = performance.now();

function loop(now) {
  const dt = Math.min(0.05, Math.max(0, (now - lastFrame) / 1000));
  lastFrame = now;
  if (!state.game) return;

  updateMovementInput();
  updateTilt(dt);

  // Animated mic-bars: driven by speech events plus a gentle breathing motion.
  if (state.voiceWanted) {
    state.speechPulse *= Math.pow(0.2, dt);
    const bars = els.micBtn.querySelectorAll('.mic-bars i');
    bars.forEach((bar, index) => {
      const breath = 0.2 + Math.abs(Math.sin(now * 0.004 + index * 0.8)) * 0.22;
      const signal = state.speechPulse * (0.5 + Math.sin(now * 0.02 + index) * 0.35);
      const height = Math.max(0.18, Math.min(1, breath + signal));
      bar.style.height = `${height * 100}%`;
    });
  }

  state.game.update(dt, now / 1000);
  state.game.render();
  requestAnimationFrame(loop);
}

/* ============================================================
   Go
   ============================================================ */

createGame();
