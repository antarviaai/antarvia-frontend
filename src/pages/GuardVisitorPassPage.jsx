import React, { useMemo, useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Tabs, Tab, TextField, Button, Grid, Chip,
  FormLabel, Autocomplete, IconButton, Tooltip, Divider,
  ToggleButton, ToggleButtonGroup, InputAdornment, FormControl,
  InputLabel, Select, MenuItem, Stack, Avatar
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import IosShareIcon from '@mui/icons-material/IosShare';
import PrintIcon from '@mui/icons-material/Print';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SendIcon from '@mui/icons-material/Send';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';

// --- Feature flags (front-end only) ---
const buildingSettings = { allowResidentPreRegistration: true };

// --- Mock directory for Units -> Hosts + Common Visitors/Vehicles ---
const mockUnitDirectory = [
  {
    unit: '1203',
    hostName: 'John Smith',
    hostType: 'Owner',
    hostPhone: '(416) 555-0190',
    lastVisitorName: 'Ava Collins',
    lastReason: 'Family',
    lastPlate: 'CDE789'
  },
  {
    unit: '803',
    hostName: 'Jane Doe',
    hostType: 'Tenant',
    hostPhone: '(416) 555-0147',
    lastVisitorName: 'Mike Carter',
    lastReason: 'Guest',
    lastPlate: 'ZZZ111'
  },
  {
    unit: 'PH01',
    hostName: 'Michael Lee',
    hostType: 'Owner',
    hostPhone: '(416) 555-0174',
    lastVisitorName: 'CleanCo Inc.',
    lastReason: 'Service',
    lastPlate: ''
  }
];

const unitOptions = mockUnitDirectory.map(u => ({ label: `${u.unit} — ${u.hostName}`, value: u.unit }));

const mockBannedPlates = ['BANNED1', 'EVILGUY'];

// Pre-Registered (today): include type to support Person/Vehicle filtering
const mockPreRegistered = [
  { id: 'pr1', type: 'person',  name: 'Ava Collins',   unit: '1203', plate: 'CDE789', reason: 'Family',  eta: '11:30 AM', status: 'Arriving' },
  { id: 'pr2', type: 'person',  name: 'Mike Carter',    unit: '803',  plate: 'ZZZ111', reason: 'Guest',   eta: '12:00 PM', status: 'Pending' },
  { id: 'pr3', type: 'person',  name: 'CleanCo Inc.',   unit: 'PH01', plate: '—',      reason: 'Service', eta: '2:00 PM',  status: 'Scheduled' },
  { id: 'pr4', type: 'vehicle', name: 'Vehicle Pass',   unit: '803',  plate: 'RVR221', reason: 'Parking', eta: '1:15 PM',  status: 'Pending' },
];

// Active visitors (people & vehicles)
const mockActive = [
  { id: 'ac1', type: 'person',  name: 'Liam Gray',    unit: '1507', plate: 'JAY321', reason: 'Guest',    checkIn: '10:04 AM' },
  { id: 'ac2', type: 'vehicle', name: 'Vehicle Pass', unit: '507',  plate: 'CAR507', reason: 'Parking',  checkIn: '10:55 AM' },
];

// ---------- Small UI primitives ----------
const Glass = ({ children, sx }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: 'rgba(26, 28, 38, 0.65)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.08)',
      ...sx,
    }}
  >
    {children}
  </Paper>
);

const SectionBar = ({ title, actions }) => (
  <Box sx={{
    px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: 'rgba(12,14,22,0.5)', borderBottom: '1px solid rgba(255,255,255,0.08)'
  }}>
    <Typography sx={{ fontWeight: 700, letterSpacing: 0.2 }}>{title}</Typography>
    <Box sx={{ display: 'flex', gap: 1 }}>{actions}</Box>
  </Box>
);

const StatusChip = ({ label }) => {
  const map = {
    Arriving:  { color: 'warning', variant: 'filled' },
    Pending:   { color: 'default', variant: 'outlined' },
    Scheduled: { color: 'info',    variant: 'outlined' },
    Active:    { color: 'success', variant: 'filled' },
    Expired:   { color: 'error',   variant: 'filled' },
    Banned:    { color: 'error',   variant: 'outlined' },
  };
  const cfg = map[label] || { color: 'default', variant: 'outlined' };
  return <Chip size="small" label={label} color={cfg.color} variant={cfg.variant} />;
};

function TabPanel({ children, value, index }) {
  return <div role="tabpanel" hidden={value !== index}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>;
}

// ---------- Mode selector (Person vs Vehicle) ----------
const ModeSelector = ({ mode, onChange }) => (
  <Glass sx={{ mb: 2 }}>
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'stretch', sm: 'center' }} spacing={1} justifyContent="space-between">
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.3, mb: 0.5 }}>Visitor Pass</Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>Choose a pass type to focus the lists and default form.</Typography>
      </Box>
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={mode}
        onChange={(e, v) => v && onChange(v)}
        sx={{
          backgroundColor: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 2,
        }}
      >
        <ToggleButton value="person"><PeopleIcon sx={{ mr: 1 }} />Person Pass</ToggleButton>
        <ToggleButton value="vehicle"><LocalParkingIcon sx={{ mr: 1 }} />Vehicle Pass</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  </Glass>
);

// ---------- Pre-Registered ----------
const PreRegisteredTab = ({ mode }) => {
  const [q, setQ] = useState('');
  const filtered = mockPreRegistered.filter(v => {
    if (mode && v.type !== mode) return false;
    const s = `${v.name} ${v.unit} ${v.plate} ${v.reason}`.toLowerCase();
    return s.includes(q.toLowerCase());
  });

  return (
    <Box>
      <SectionBar
        title="Pre-Registered Today"
        actions={
          <>
            <Tooltip title="Scan">
              <IconButton><QrCodeScannerIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Filters">
              <IconButton><FilterListIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Export">
              <IconButton><IosShareIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Print">
              <IconButton><PrintIcon /></IconButton>
            </Tooltip>
          </>
        }
      />
      <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          placeholder="Search name, unit, or plate"
          value={q} onChange={(e) => setQ(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
          sx={{ minWidth: 320 }}
        />
        <Chip icon={<PeopleIcon />} label={`${filtered.length} scheduled`} />
      </Box>

      <Grid container spacing={2} sx={{ p: 2, pt: 0 }}>
        {filtered.map(v => (
          <Grid key={v.id} item xs={12} md={6} lg={4}>
            <Glass>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>{v.name}</Typography>
                <StatusChip label={v.status} />
              </Box>
              <Typography variant="body2">Unit: <b>{v.unit} ({getHostName(v.unit)})</b></Typography>
              <Typography variant="body2">Plate: <b>{v.plate || '—'}</b></Typography>
              <Typography variant="body2">Reason: <b>{v.reason}</b></Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1.5 }}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="caption">Arriving {v.eta}</Typography>
              </Box>
              <Divider sx={{ my: 1.5, opacity: 0.2 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="contained">Check-In</Button>
                <Button size="small" variant="outlined">View</Button>
              </Box>
            </Glass>
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Glass><Typography>No matches.</Typography></Glass>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

// ---------- Active Visitors ----------
const ActiveVisitorsTab = ({ mode }) => {
  const [q, setQ] = useState('');
  const [now, setNow] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(id); }, []);

  const filtered = mockActive.filter(v => {
    if (mode && v.type !== mode) return false;
    const s = `${v.name} ${v.unit} ${v.plate} ${v.reason}`.toLowerCase();
    return s.includes(q.toLowerCase());
  });

  const minsSince = (timeStr) => {
    try {
      const d = new Date();
      const [hhmm, ap] = timeStr.split(' ');
      let [h, m] = hhmm.split(':').map(Number);
      if (ap === 'PM' && h !== 12) h += 12;
      if (ap === 'AM' && h === 12) h = 0;
      const check = new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m);
      return Math.max(0, Math.round((now - check) / 60000));
    } catch { return 0; }
  };

  return (
    <Box>
      <SectionBar
        title="Active Visitors"
        actions={
          <>
            <Tooltip title="Export">
              <IconButton><IosShareIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Print Fire List">
              <IconButton><PrintIcon /></IconButton>
            </Tooltip>
          </>
        }
      />
      <Box sx={{ p: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          placeholder="Search name, unit, or plate"
          value={q} onChange={(e) => setQ(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
          sx={{ minWidth: 320 }}
        />
        <Chip color="success" icon={<CheckCircleIcon />} label={`${filtered.length} inside`} />
      </Box>

      <Grid container spacing={2} sx={{ p: 2, pt: 0 }}>
        {filtered.map(v => (
          <Grid key={v.id} item xs={12} md={6} lg={4}>
            <Glass>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontWeight: 700 }}>{v.name}</Typography>
                <StatusChip label="Active" />
              </Box>
              <Typography variant="body2">Unit: <b>{v.unit} ({getHostName(v.unit)})</b></Typography>
              <Typography variant="body2">Plate: <b>{v.plate || '—'}</b></Typography>
              <Typography variant="body2">Reason: <b>{v.reason}</b></Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 1.5 }}>
                <AccessTimeIcon fontSize="small" />
                <Typography variant="caption">Checked In {v.checkIn} • Inside {minsSince(v.checkIn)}m</Typography>
              </Box>
              <Divider sx={{ my: 1.5, opacity: 0.2 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button size="small" variant="contained" color="success">Check-Out</Button>
                <Button size="small" variant="outlined">View</Button>
              </Box>
            </Glass>
          </Grid>
        ))}
        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Glass><Typography>No active visitors.</Typography></Glass>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

// ---------- Create New Pass (Boxed form; Unit second; auto-fill host + suggestions) ----------
const CreatePassForm = ({ mode }) => {
  const [passType, setPassType] = useState('single'); // single | multi | recurring

  // 1) Mode shown externally (Person/Vehicle). Keep here to choose field set.
  // 2) Unit (searchable) – selecting auto-fills host & suggestions
  const [unitOpt, setUnitOpt] = useState(null);
  const [host, setHost] = useState({ name: '', phone: '', type: '' });

  // Visitor/Vehicle fields
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [plate, setPlate] = useState('');
  const [reason, setReason] = useState(mode === 'vehicle' ? 'Parking' : 'Guest');

  // Multi / Recurring
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate]     = useState('');
  const [days, setDays]           = useState([]);
  const [timeFrom, setTimeFrom]   = useState('');
  const [timeTo, setTimeTo]       = useState('');

  const [isFlagged, setIsFlagged] = useState(false);

  const requiredMissing = useMemo(() => {
    if (!unitOpt?.value) return true;                       // unit first
    if (mode === 'person' && !visitorName?.trim()) return true;
    if (mode === 'vehicle' && !plate?.trim()) return true;
    return false;
  }, [mode, unitOpt, visitorName, plate]);

  const onUnitChange = (_, newOpt) => {
    setUnitOpt(newOpt);
    if (!newOpt) {
      setHost({ name: '', phone: '', type: '' });
      return;
    }
    const rec = mockUnitDirectory.find(u => u.unit === newOpt.value);
    if (rec) {
      setHost({ name: rec.hostName, phone: rec.hostPhone, type: rec.hostType });
      // Smart suggestions (demo): pre-fill common visitor + plate
      if (mode === 'person' && !visitorName) {
        setVisitorName(rec.lastVisitorName || '');
        if (rec.lastReason) setReason(rec.lastReason);
      }
      if (!plate && rec.lastPlate) {
        setPlate(rec.lastPlate);
        setIsFlagged(mockBannedPlates.includes(rec.lastPlate.toUpperCase()));
      }
    }
  };

  const onPlateChange = (e) => {
    const p = e.target.value.toUpperCase();
    setPlate(p);
    setIsFlagged(mockBannedPlates.includes(p));
  };

  const submit = (e) => {
    e.preventDefault();
    alert('Pass issued (demo)');
    /* eslint-disable no-console */
    console.log({
      mode, passType, unit: unitOpt?.value, host,
      visitorName, visitorPhone, plate, reason,
      startDate, endDate, days, timeFrom, timeTo,
    });
  };

  return (
    <Glass component="form" onSubmit={submit}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Create New Pass</Typography>
        <Chip icon={<EventRepeatIcon />} label={passType === 'single' ? 'Single-Day' : passType === 'multi' ? 'Multi-Day' : 'Recurring'} />
      </Box>

      {/* Watchlist banner */}
      {isFlagged && (
        <Glass sx={{ mb: 2, borderColor: 'rgba(255,0,0,0.25)', p: 1.5 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'error.light' }}>
            <WarningAmberIcon />
            <Typography sx={{ fontWeight: 700 }}>On Watchlist: plate matches a restricted record.</Typography>
          </Stack>
        </Glass>
      )}

      <Grid container spacing={2}>
        {/* (1) Pass type segmented */}
        <Grid item xs={12}>
          <FormLabel sx={{ mb: 1, display: 'block' }}>Pass Type</FormLabel>
          <ToggleButtonGroup
            exclusive value={passType} onChange={(e, v) => v && setPassType(v)}
            sx={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 2 }}
          >
            <ToggleButton value="single">Single-Day</ToggleButton>
            <ToggleButton value="multi">Multi-Day</ToggleButton>
            <ToggleButton value="recurring">Recurring</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        {/* (2) Unit & Host (Unit is second field as requested) */}
        <Grid item xs={12} sm={6}>
          <FormLabel sx={{ mb: 1, display: 'block' }}>Unit</FormLabel>
          <Autocomplete
            options={unitOptions}
            value={unitOpt}
            onChange={onUnitChange}
            renderInput={(params) => <TextField {...params} required label="Select Unit" />}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel sx={{ mb: 1, display: 'block' }}>Host</FormLabel>
          <Glass sx={{ p: 1.25 }}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar sx={{ width: 32, height: 32 }}>{(host.name || 'H').slice(0,1)}</Avatar>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700 }}>{host.name || '—'}</Typography>
                <Typography variant="caption" sx={{ opacity: 0.7 }}>{host.type || ''}{host.phone ? ` • ${host.phone}` : ''}</Typography>
              </Box>
            </Stack>
          </Glass>
        </Grid>

        {/* (3) Visitor / Vehicle */}
        {mode === 'person' ? (
          <>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>Visitor</FormLabel>
              <TextField fullWidth required label="Full Name" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>Phone (Optional)</FormLabel>
              <TextField fullWidth label="Phone" type="tel" value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} />
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>Vehicle</FormLabel>
              <TextField
                fullWidth required label="License Plate"
                value={plate} onChange={onPlateChange}
                InputProps={{ startAdornment: <InputAdornment position="start"><LocalParkingIcon fontSize="small" /></InputAdornment> }}
                error={isFlagged}
                helperText={isFlagged ? '⚠ Plate is on Watchlist' : ''}
                sx={{ '& .MuiFormHelperText-root': { fontWeight: 700 } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>Duration</FormLabel>
              <FormControl fullWidth>
                <InputLabel id="dur">Duration</InputLabel>
                <Select labelId="dur" label="Duration" defaultValue="midnight">
                  <MenuItem value="2h">2 Hours</MenuItem>
                  <MenuItem value="4h">4 Hours</MenuItem>
                  <MenuItem value="midnight">Until Midnight</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </>
        )}

        {/* Plate field also available in Person mode (optional) */}
        {mode === 'person' && (
          <Grid item xs={12}>
            <FormLabel sx={{ mb: 1, display: 'block' }}>Vehicle (Optional)</FormLabel>
            <TextField
              fullWidth label="License Plate"
              value={plate} onChange={onPlateChange}
              InputProps={{ startAdornment: <InputAdornment position="start"><LocalParkingIcon fontSize="small" /></InputAdornment> }}
              error={isFlagged}
              helperText={isFlagged ? '⚠ Plate is on Watchlist' : ''}
              sx={{ '& .MuiFormHelperText-root': { fontWeight: 700 } }}
            />
          </Grid>
        )}

        {/* (4) Reason & Notes */}
        <Grid item xs={12} sm={6}>
          <FormLabel sx={{ mb: 1, display: 'block' }}>Reason</FormLabel>
          <FormControl fullWidth>
            <InputLabel id="reason">Reason</InputLabel>
            <Select
              labelId="reason" label="Reason" value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              {mode === 'vehicle' && <MenuItem value="Parking">Parking</MenuItem>}
              <MenuItem value="Guest">Guest</MenuItem>
              <MenuItem value="Family">Family</MenuItem>
              <MenuItem value="Service">Service</MenuItem>
              <MenuItem value="Delivery">Delivery</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel sx={{ mb: 1, display: 'block' }}>Attach (Optional)</FormLabel>
          <Button variant="outlined" startIcon={<CameraAltIcon />} fullWidth sx={{ height: 56 }}>
            Take Photo (Coming Soon)
          </Button>
        </Grid>

        {/* (5) Multi / Recurring extra fields */}
        {passType === 'multi' && (
          <>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>Start Date</FormLabel>
              <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>End Date</FormLabel>
              <TextField fullWidth type="date" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </Grid>
          </>
        )}
        {passType === 'recurring' && (
          <>
            <Grid item xs={12}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>Days of Week</FormLabel>
              <ToggleButtonGroup value={days} onChange={(e, v) => setDays(v)} sx={{ flexWrap: 'wrap', gap: 1 }}>
                {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <ToggleButton key={d} value={d}>{d}</ToggleButton>)}
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>From</FormLabel>
              <TextField fullWidth type="time" InputLabelProps={{ shrink: true }} value={timeFrom} onChange={(e) => setTimeFrom(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormLabel sx={{ mb: 1, display: 'block' }}>To</FormLabel>
              <TextField fullWidth type="time" InputLabelProps={{ shrink: true }} value={timeTo} onChange={(e) => setTimeTo(e.target.value)} />
            </Grid>
          </>
        )}

        {/* (6) Review & Issue */}
        <Grid item xs={12}>
          <Divider sx={{ my: 1.5, opacity: 0.2 }} />
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button type="submit" variant="contained" endIcon={<SendIcon />} disabled={isFlagged || requiredMissing} sx={{ height: 56 }}>
              Issue Pass
            </Button>
            <Button variant="outlined" startIcon={<QrCodeScannerIcon />} sx={{ height: 56 }}>
              Preview QR (Demo)
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Glass>
  );
};

// Utility
function getHostName(unit) {
  const rec = mockUnitDirectory.find(u => u.unit === unit);
  return rec?.hostName || '—';
}

// ---------- Main Page ----------
const GuardVisitorPassPage = () => {
  const [mode, setMode] = useState('person'); // 'person' | 'vehicle'
  const [tab, setTab] = useState(0);

  const tabs = useMemo(() => {
    const arr = [];
    if (buildingSettings.allowResidentPreRegistration) {
      arr.push({ label: 'Pre-Registered (Today)', icon: <PeopleIcon />, component: <PreRegisteredTab mode={mode} /> });
    }
    arr.push({ label: 'Active Visitors', icon: <CheckCircleIcon />, component: <ActiveVisitorsTab mode={mode} /> });
    arr.push({ label: 'Create New Pass', icon: <AddCircleIcon />, component: <CreatePassForm mode={mode} /> });
    return arr;
  }, [mode]);

  return (
    <Box>
      {/* Mode selector */}
      <ModeSelector mode={mode} onChange={setMode} />

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'rgba(30,30,36,0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Header bar */}
        <Box sx={{
          px: 2, py: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(12,14,22,0.6), rgba(12,14,22,0.2))',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.3 }}>
            {mode === 'person' ? 'Person Pass' : 'Vehicle Pass'}
          </Typography>
          <Button startIcon={<QrCodeScannerIcon />} variant="outlined">Scan Pass</Button>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Tabs
            value={tab}
            onChange={(e, v) => setTab(v)}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': { py: 1.25, textTransform: 'none', fontWeight: 600 },
              '& .MuiTabs-indicator': { height: 3 },
            }}
          >
            {tabs.map((t, i) => (
              <Tab key={i} icon={t.icon} iconPosition="start" label={t.label} />
            ))}
          </Tabs>
        </Box>

        {/* Panels */}
        {tabs.map((t, i) => (
          <TabPanel key={i} value={tab} index={i}>
            {t.component}
          </TabPanel>
        ))}
      </Paper>
    </Box>
  );
};

export default GuardVisitorPassPage;
