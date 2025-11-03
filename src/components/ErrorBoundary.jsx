import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error){ return { error }; }
  componentDidCatch(error, info){ console.error("UI Error:", error, info); }
  render(){
    if (!this.state.error) return this.props.children;

    const msg = String(this.state.error?.message || this.state.error);
    return (
      <div style={{
        padding: "16px", margin: "16px", borderRadius: 12,
        border: "1px solid #ef4444", background: "#FEF2F2", color:"#991B1B",
        fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
      }}>
        <h2 style={{margin:"0 0 8px"}}>😵 Oops, algo lanzó un error</h2>
        <pre style={{whiteSpace:"pre-wrap"}}>{msg}</pre>
        <p style={{marginTop:8, fontSize:14, color:"#7F1D1D"}}>
          Revisa qué import/archivo menciona arriba. Si no cachas, mándamelo tal cual.
        </p>
        <button
          onClick={()=>this.setState({error:null})}
          style={{
            padding:"8px 12px", borderRadius:8, border:"1px solid #ef4444",
            background:"#fff", color:"#991B1B", cursor:"pointer"
          }}>
          Reintentar
        </button>
      </div>
    );
  }
}
